export default function FeedItem({todo}) {
    return <div title={JSON.stringify(todo)}>ID: {todo.id}: {todo.title}</div>;
}