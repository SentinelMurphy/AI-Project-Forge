export function Dashboard (){
  return(
    <section className="flex">
      <div className="items-stretch">
        <div className="w-36 self-auto">current reads</div>
      </div>

      <div className="items-stretch">
        <div className="w-36 self-auto">reads</div>
      </div>
      <div className="items-stretch">
        <div className="w-36 self-auto">complete</div>
      </div>
    </section>
  );
}