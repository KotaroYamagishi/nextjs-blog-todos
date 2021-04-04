import { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import TaskItem from "../components/Task";
import useSWR from "swr";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";
import { Task } from "../interface";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage = ({ staticfilterdTasks }) => {
  const { data: tasks, mutate } = useSWR<Task[]>(apiUrl, fetcher, {
    initialData: staticfilterdTasks,
  });
  // useSWRで取得したデータをフィルタリングしてくれる
  const filteredTasks = tasks?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  // 最新情報に確実にマウントされるように、初期表示時、mutate()
  // mutate()は、dataを最新状態にしてくれる
  useEffect(() => {
    mutate();
  }, []);
  return (
    <StateContextProvider>
      <Layout title="Task page">
        {/* 追加・編集form */}
        <TaskForm taskCreated={mutate} />
        {/* 記事一覧 */}
        <ul>
          {filteredTasks &&
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} taskDeleted={mutate} />
            ))}
        </ul>
        {/* 戻るボタン */}
        <Link href="/main-page">
          <div className="flex cursor-pointer mt-12">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
};
export async function getStaticProps() {
  const staticfilterdTasks = await getAllTasksData();

  return {
    props: { staticfilterdTasks },
    revalidate: 3,
  };
}

export default TaskPage;
