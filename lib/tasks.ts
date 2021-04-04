import fetch from "node-fetch";
import { Task } from "../interface";

export async function getAllTasksData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks: Task[] = await res.json();
  const staticfilterdTasks = tasks.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return staticfilterdTasks;
}

export async function getAllTaskIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks: Task[] = await res.json();

  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
}
export async function getTaskData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`)
  );
  const task: Task = await res.json();
  return task;
}
