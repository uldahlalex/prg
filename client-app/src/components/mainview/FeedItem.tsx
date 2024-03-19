export default function FeedItem({todo}) {
    //todo prøv headless UI
    return <button className="button-outline" title={JSON.stringify(todo)}>ID: {todo.id}: {todo.title}</button>;
}