export default async function WaitingPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Waiting for Order {params.id}</h1>
    </div>
  );
}
