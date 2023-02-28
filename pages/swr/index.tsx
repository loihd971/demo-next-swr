import React, { useState } from "react";
import useSWR, { preload } from "swr";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import styles from "@/styles/Comment.module.scss";
import * as Yup from "yup";
import httpClient from "@/libs/httpClient";
import { useRouter } from "next/router";
import { Cols, CommentEnum, Comments, CrudType, Posts } from "@/utils/model";
import {
  Button,
  Grid,
  Textarea,
  Input,
  Modal,
  Row,
  Col,
  Tooltip,
  User,
  styled,
  Text,
  theme as altTheme,
  Table,
  Popover,
  globalCss,
  Pagination,
  useTheme,
  Spacer,
} from "@nextui-org/react";
import { FORMAT_DATE } from "@/utils/constants";
import moment from "moment";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import CustomTable from "@/components/CustomTable";
import CommentModal from "@/components/CommentModal";

export default function SWR() {
  const defaultFilter = {
    page: 1,
    pageSize: 10,
  };

  const router = useRouter();
  const [filters, setFilters] = useState<any>(defaultFilter);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  // /* --------------------------------- use swr -------------------------------- */
  const { data, mutate } = useSWR(
    `/comments?page=${filters.page}&pageSize=${filters.pageSize}`
  );

  /* ------------------------------ preload data ------------------------------ */
  // preload("/comments", (url) => httpClient.get(url).then((res) => res.data));

  const onFetchData = async () => {
    try {
      const res: any = await httpClient.get("/comments");
      mutate("/comments");
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewComment = async (values: Comments, action: any) => {};

  const handleEditComment = async (
    { _id: id, description }: Comments,
    action: any
  ) => {
    const body = { id, description };

    try {
      const res: any = await httpClient.put("/comments", body);
      if (res.status === 200) {
        action.resetForm();
        mutate(res.data.data);
        setIsEditModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableFilter = (value: any) => {
    setFilters((pre: any) => ({ ...pre, ...value }));
    // mutate("/comments");
  };

  const handleCreateComment = async (values: Comments, action: any) => {
    try {
      const res: any = await httpClient.post("/comments", values as any);
      if (res.status === 200) {
        action.resetForm();
        mutate(res.data.data);
        setIsAddModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (record: Comments) => {
    try {
      const res: any = await httpClient.delete("/comments", {
        data: { id: record._id },
      });
      if (res.status === 200) {
        onFetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitForm = (
    values: Partial<Posts>,
    action: any,
    type: CrudType
  ) => {
    type === CrudType.ADD && handleCreateComment(values, action);
    type === CrudType.EDIT && handleEditComment(values, action);
  };

  const handleRedirectDetail = (id: string) => {
    router.push({
      pathname: "/swr/[id]",
      query: { id },
    });
  };

  const tableColumn: Cols[] = [
    {
      title: "Description",
      key: CommentEnum.description,
      // sortable: true,
      searchtype: "text",
      filter: false,
      width: 300,
      dataIndex: CommentEnum.description,
    },
    {
      title: "Created At",
      key: CommentEnum.createdAt,
      filter: true,
      searchtype: "date",

      dataIndex: CommentEnum.createdAt,
      width: 300,
      render: (value: any) => {
        return moment(value).format(FORMAT_DATE);
      },
    },
    {
      title: "Updated At",
      key: CommentEnum.updatedAt,
      width: 300,
      filter: false,
      searchtype: "date",
      dataIndex: CommentEnum.updatedAt,
      render: (value: any) => {
        return moment(value).format(FORMAT_DATE);
      },
    },
    {
      title: "Action",
      key: CommentEnum.action,
      dataIndex: CommentEnum.action,
      fixed: "right",
      width: 100,
      render: (_: any, record: Comments) => {
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="View comment">
                <>
                  <HiEye
                    size={20}
                    fill="#979797"
                    onClick={() => console.log("view action")}
                  />
                </>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit comment">
                <>
                  <HiPencil
                    size={20}
                    fill="#979797"
                    onClick={() => {
                      setSelectedRow(record);
                      setIsEditModalVisible(true);
                    }}
                  />
                </>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete comment"
                color="error"
                onClick={() => handleDeleteComment(record)}
              >
                <>
                  <HiTrash size={20} fill="#FF0080" />
                </>
              </Tooltip>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <div className={styles.comment__wrapper}>
      <Spacer y={1} />
      <Button
        onClick={() => setIsAddModalVisible(true)}
        css={{ width: "80px" }}
      >
        Add
      </Button>
      <Spacer y={1} />
      <CustomTable
        shadow={true}
        color="secondary"
        css={{
          height: "auto",
          minWidth: "100%",
          padding: "0",
          borderRadius: 0,
        }}
        initialFilter={defaultFilter}
        total={data?.total}
        onTableFilter={handleTableFilter}
        selectionMode="multiple"
        columns={tableColumn as any}
        data={data?.data}
      />
      {isAddModalVisible && (
        <CommentModal
          type={CrudType.ADD}
          visible={isAddModalVisible}
          setVisible={setIsAddModalVisible}
          width="500px"
          onSubmit={onSubmitForm}
        />
      )}

      {isEditModalVisible && (
        <CommentModal
          initialData={selectedRow}
          type={CrudType.EDIT}
          visible={isEditModalVisible}
          setVisible={setIsEditModalVisible}
          width="500px"
          onSubmit={onSubmitForm}
        />
      )}
    </div>
  );
}
