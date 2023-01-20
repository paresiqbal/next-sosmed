export default function ({ children, avatar, username, description }) {
  return (
    <div className="bg-secondary-blue p-6 border-b-2 rounded-md">
      <div className="flex items-center gap-2">
        <img src={avatar} className="w-10 rounded-full" />
        <div className="flex flex-col">
          <h2 className="text-md">{username}</h2>
          <p className="text-xs">7:20 PM · Jan 19, 2023</p>
        </div>
      </div>
      <div className="py-5">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
