import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const collection = client.db().collection('todos');
  try {
    const todos = await collection.find({}).toArray();
    return NextResponse.json(todos, {status: 200})
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching todos' }, {status: 500});
  }
}

export async function POST(req:any) {
  const {text} = await req.json();
  const client = await clientPromise;
  const collection = client.db().collection('todos');
    try {
      const todo = { text: text, completed: false };
      await collection.insertOne(todo);
      return NextResponse.json(todo, {status: 201})
    } catch (error) {
      return NextResponse.json(error, {status: 500});
    }

}

export async function PUT(req: NextRequest) {
  const {id, text, completed} = await req.json();

  const client = await clientPromise;
  const collection = client.db().collection('todos');
  try {
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { text, completed } });
    return NextResponse.json({ message: 'Todo updated successfully' }, {status: 200})
  } catch (error) {
    return NextResponse.json({ message: 'Error updating todo'}, {status: 500});
  }
}

export async function DELETE(req:Request) {
  const {id } = await req.json();

  const client = await clientPromise;
  const collection = client.db().collection('todos');
  try {
    await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: 'Todo deleted successfully' }, {status: 200})
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting todo'}, {status: 500});
  }
}

