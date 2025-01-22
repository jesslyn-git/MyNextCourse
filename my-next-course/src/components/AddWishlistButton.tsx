"use client"

import { deleteUser } from "./actions"

type Props = {
  id: string
}

export default function DeleteButton({ id }: Props) {

  const handleDelete = async () => {
    const result = await deleteUser(id)

    console.log(result)
  }

  return <button onClick={handleDelete}>Delete</button>
}
