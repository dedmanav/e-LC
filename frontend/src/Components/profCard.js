import React from "react";
import trash from "../assets/img/trash.svg";
import { useNavigate } from "react-router-dom";

function AdminCards(props) {
  const navigate = useNavigate();
  const targetID = props.productID;
  const handleDelete = async () => {
    const res = await fetch(`/delete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetID
      }),
    });

    const result = await res.json();
    console.log(result);

    if (res.status === 201) {
      window.alert("Item deleted successfully");
      console.log("Item deleted successfully");
      window.location.reload(false);
    } else {
      window.alert("Could not delete your Data");
      console.log("Could not delete your Data");
    }
  };

  return (
    <div className="flex mx-auto my-5">
      <div
        className="flex flex-col items-center bg-white bg-opacity-30 rounded-lg border shadow-md md:flex-row md:max-w-5xl sm:max-w-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={props.productImage}
          alt=""
        />

        <div className="lg:w-[50rem] md:w-[30rem] flex flex-col  p-4 leading-normal ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
            {props.productName}
          </h5>
          <p className="mb-3 font-normal text-gray-100 dark:text-gray-400">
            {props.productInfo}
          </p>
        </div>
      </div>
      <button
        onClick={handleDelete}>
        <img
          className="object-cover bg-green-500 rounded-t-lg md:h-20 md:w-20 md:rounded-none md:rounded-l-lg hover:bg-red-700"
          src={trash}
          alt=""
          style = {{padding: "8px 8px 8px 8px", marginLeft: "15px"}}
        />
      </button>
    </div>
  );
}

AdminCards.defaultProps = {
  productName: "Product ABC XYZ",
  productInfo:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus facere, animi veniam, iure dignissimos officiis fugiat, aliquam a laboriosam voluptatem nulla natus. Placeat tenetur commodi fugiat quia, magni cum quos.",
};

export default AdminCards;
