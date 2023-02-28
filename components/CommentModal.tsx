import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Grid,
  Input,
  Modal,
  Row,
  Text,
  Table,
  Textarea,
  theme,
} from "@nextui-org/react";
import { Comments, CrudType } from "@/utils/model";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import styles from "@/styles/Comment.module.scss";
import * as Yup from "yup";

type Props = {
  visible: boolean;
  setVisible: (value: any) => void;
  onSubmit: (e: any, actions: any, type: CrudType) => void;
  initialData?: Comments | any;
  width: string;
  type: CrudType;
};

function CommentModal({
  visible,
  setVisible,
  onSubmit,
  initialData,
  type,
  ...rest
}: Props) {
  const initialFormData: Comments = { description: "" };
  const handleCloseModal = () => {
    setVisible(false);
  };

  const customTextarea = ({ field, form, ...props }: any) => {
    return (
      <Textarea
        aria-label="description"
        {...props}
        {...field}
        css={{ width: "100%" }}
        placeholder="Description"
        rows={4}
      />
    );
  };

  return (
    <Modal {...rest} closeButton blur open={visible} onClose={handleCloseModal}>
      <Modal.Header>
        <Text h6>
          <b>
            {type === CrudType.ADD
              ? "Add"
              : type === CrudType.EDIT
              ? "Edit"
              : "View"}{" "}
            Comment
          </b>
        </Text>
      </Modal.Header>
      <Modal.Body
        css={{
          maxHeight: "500px",
          scrollbarWidth: "5px !important",
          overflowX: "hidden",
        }}
      >
        <Formik
          initialValues={initialData || initialFormData}
          onSubmit={(values: Comments, actions) =>
            onSubmit(values, actions, type)
          }
          validationSchema={Yup.object({
            description: Yup.string()
              .max(100, "Must be 100 characters or less")
              .required("Required"),
          })}
        >
          {(props: FormikProps<any>) => (
            <Form className={styles.formik__wrapper}>
              <Field
                type="text"
                name="description"
                component={customTextarea}
              />
              <ErrorMessage
                name="description"
                render={(msg) => <p className={styles.field__error}>{msg}</p>}
              />

              <Button css={{ width: "50px" }} size="sm" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default CommentModal;
