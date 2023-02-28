import React from "react";
import { Button, Card, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import styles from "@/styles/Post.module.scss";
import httpClient from "@/libs/httpClient";
import moment from "moment";
import { FORMAT_DATE } from "@/utils/constants";

export default function PostDetail(data: any) {
  const router = useRouter();

  return (
    <div className={styles.post__detail}>
      <Text
        h6
        size={15}
        onClick={() => router.back()}
        color="primary"
        css={{ mt: 0, cursor: "pointer" }}
      >
        <u>Back</u>
      </Text>
      <Card css={{ h: "full", $$cardColor: "$colors$primary", padding: "1em" }}>
        <Text h6 size={20} color="white" css={{ mt: 0, textAlign: "center" }}>
          Post&apos;s Detail
        </Text>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ mt: 0 }}>
            Title: <p>{data.title}</p>
          </Text>
          <Text h3 size={15} color="white" css={{ mt: 0 }}>
            Description: <p>{data.description}</p>
          </Text>
          <Text h3 size={15} color="white" css={{ mt: 0 }}>
            Create At: <p>{moment(data.createdAt).format(FORMAT_DATE)}</p>
          </Text>
          <Text h3 size={15} color="white" css={{ mt: 0 }}>
            Updated At: <p>{moment(data.updatedAt).format(FORMAT_DATE)}</p>
          </Text>
        </Card.Body>
      </Card>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               getinitialprops                              */
/* -------------------------------------------------------------------------- */
// PostDetail.getInitialProps = async (ctx: any) => {
//   const { query } = ctx;
//   const res = await httpClient.get(`/posts`, {
//     params: { ...query, isDetail: true },
//   });
//   return { postDetail: res.data };
// };

/* -------------------------------------------------------------------------- */
/*                               getStaticProps                               */
/* -------------------------------------------------------------------------- */
export const getStaticProps = async ({ params }: any) => {
  const posts = await httpClient.get(`/posts`, {
    params: {
      id: params.id,
      isDetail: true,
    },
  });

  return {
    props: posts.data,
  };
};

/* -------------------------------------------------------------------------- */
/*                               getStaticPaths                               */
/* -------------------------------------------------------------------------- */
export async function getStaticPaths() {
  const res: any = await httpClient.get(`/posts`);

  // Get the paths we want to pre-render based on posts
  const paths = res.data.data?.map((post: any) => ({
    params: { id: post._id.toString() },
  }));

  return { paths, fallback: false };
}
