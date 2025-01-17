import Share from "../shared/Share";

export default function Feed() {
  return (
    <div
      style={{ height: "calc(100vh - 60px)" }}
      className="flex-[5] border border-blue-700"
    >
      <div className="p-6">
        <Share />
      </div>
    </div>
  );
}
