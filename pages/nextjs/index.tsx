import React, { useState } from "react";
import useSWR, { preload } from "swr";
import { Grid, Card, Text, Button, Textarea, Input } from "@nextui-org/react";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import styles from "@/styles/Post.module.scss";
import * as Yup from "yup";
import httpClient from "@/libs/httpClient";
import { useRouter } from "next/router";
import { Posts } from "@/utils/model";

type Props = {};

type TextType = {
  text: string;
  desc: string;
  id: string;
};

export default function PostList({ data }: any) {
  const [postList, setPostList] = useState<Posts[]>(data.data);
  const initialFormData: Partial<Posts> = { title: "", description: "" };
  const router = useRouter();

  // /* --------------------------------- use ser -------------------------------- */
  // const { data, mutate, error } = useSWR("/posts", {
  // /* ------------------------------ fallback data ----------------------------- */
  // fallbackData: [],
  // });

  /* ------------------------------ preload data ------------------------------ */
  // preload("/posts", (url) => httpClient.get(url).then((res) => res.data));

  const onFetchData = async () => {
    try {
      const res: any = await httpClient.get("/posts");
      setPostList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePost = async (values: Partial<Posts>, action: any) => {
    try {
      const res: any = await httpClient.post("/posts", values as any);
      if (res.status === 200) {
        onFetchData();
        action.resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const res: any = await httpClient.delete("/posts", { data: { id } });
      if (res.status === 200) {
        onFetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitForm = (values: Partial<Posts>, action: any) => {
    handleCreatePost(values, action);
  };

  const handleRedirectDetail = (id: string) => {
    router.push({
      pathname: "/nextjs/[id]",
      query: { id },
    });
  };

  const MockItem = ({ id, text, desc }: TextType) => {
    return (
      <Card css={{ h: "full", $$cardColor: "$colors$primary" }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ mt: 0 }}>
            {text}
          </Text>
          <Text h3 size={15} color="white" css={{ mt: 0 }}>
            {desc}
          </Text>
        </Card.Body>
        <Button
          onClick={() => handleDeletePost(id)}
          size="xs"
          color="error"
          css={{ width: "20px", margin: "10px" }}
        >
          Delete
        </Button>
      </Card>
    );
  };

  const customTextarea = ({ field, form, ...props }: any) => {
    return (
      <Textarea
        aria-label="title"
        {...props}
        {...field}
        css={{ width: "100%" }}
        placeholder="Description"
        rows={4}
      />
    );
  };

  const customInput = ({ field, form, ...props }: any) => {
    return (
      <Input
        {...field}
        {...props}
        aria-label="title"
        css={{ width: "100%" }}
        placeholder="Title"
      />
    );
  };
  return (
    <div className={styles.comment__wrapper}>
      <Formik
        initialValues={initialFormData}
        onSubmit={(values: Partial<Posts>, actions) =>
          onSubmitForm(values, actions)
        }
        validationSchema={Yup.object({
          title: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
        })}
      >
        {(props: FormikProps<any>) => (
          <Form className={styles.formik__wrapper}>
            <Text h3>Add Post</Text>
            <Field type="text" name="title" component={customInput} />
            <ErrorMessage
              name="title"
              render={(msg) => <p className={styles.field__error}>{msg}</p>}
            />

            <Field type="text" name="description" component={customTextarea} />
            <ErrorMessage
              name="description"
              render={(msg) => <p className={styles.field__error}>{msg}</p>}
            />

            <Button css={{ width: "50px" }} size="sm" type="submit">
              Create
            </Button>
          </Form>
        )}
      </Formik>
      <Grid.Container gap={2} justify="center" wrap="wrap">
        {postList?.map((post: Posts) => (
          <Grid
            sm={6}
            xs={6}
            md={4}
            lg={4}
            key={post._id}
            onClick={() => handleRedirectDetail(post._id)}
          >
            <MockItem id={post._id} text={post.title} desc={post.description} />
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
}
// export async function getStaticProps() {
//   const res = await httpClient.get("/posts");
//   return {
//     props: {
//       data: res.data.data,
//     },
//   };
// }

/* -------------------------------------------------------------------------- */
/*                             getServerSideProps                             */
/* -------------------------------------------------------------------------- */
export async function getServerSideProps(ctx: any) {
  const res = await httpClient.get("/posts");
  return {
    props: {
      data: res.data,
    },
  };
}
