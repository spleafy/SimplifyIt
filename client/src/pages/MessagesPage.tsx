import { useState } from "react";
import { useForm } from "react-hook-form";
// Components
import Column from "../components/Column";
import PrimaryButton from "../components/PrimaryButton";
// Socket IO
import io from "socket.io-client";

const MessagesPage = () => {
  document.title = `Messages / ${process.env.REACT_APP_TITLE}`;

  const [messages, setMessages]: any = useState([]);

  const socket = io(
    `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}:5000`
  );

  socket.on("broadcast-message", (data) => {
    setMessages([...messages, data]);
  });

  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  const submit = async (values: any) => {
    socket.emit("send-message", values.message);
  };

  return (
    <>
      <Column width="[400px]">
        <h1>Messages</h1>
      </Column>
      <Column width="full">
        <h1>Messages</h1>
        <div className="overflow-auto">
          {messages.map((message: string, index: number) => (
            <div className="my-2 text-white" key={index}>
              {message}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="bottom-5 absolute flex gap-5"
        >
          <input
            id="message"
            placeholder="Enter message:"
            type="text"
            className="text-sm py-2 rounded-md border-2 border-slate-200 px-4 placeholder:text-slate-200 focus-within:border-slate-300 transition-colors items-center dark:border-slate-500"
            {...register("message")}
          />
          <div className="w-fit">
            <PrimaryButton submit={true}>Send Message</PrimaryButton>
          </div>
        </form>
      </Column>
    </>
  );
};

export default MessagesPage;
