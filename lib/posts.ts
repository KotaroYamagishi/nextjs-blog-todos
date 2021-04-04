import fetch from "node-fetch";
import { Post } from "../interface";

export async function getAllPostsData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts: Post[] = await res.json();
  // 受け取った値を並び替え
  const filteredPosts = posts.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return filteredPosts;
}

export async function getAllPostIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts: Post[] = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

export async function getPostData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`)
  );
  const post: Post = await res.json();
  return post;
}
