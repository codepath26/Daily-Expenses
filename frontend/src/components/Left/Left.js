
import { navItems } from "../../utils/navItems";
import { signout } from "../../utils/icons";

function Left({active,activeHandler}) {


  return (
    <div className="w-[20%] relative  border-[3px] border-white bg-gray-100 bg-opacity-80  m-4 rounded-[20px]">
      <div className="h-[100px] flex items-center gap-[1rem] ps-2">
        <div className="w-[80px] h-[80px] rounded-full border bg-pink-100  shadow-md">
          <img
            className="object-cover h-full w-full"
            src={process.env.PUBLIC_URL + "/Images/man.png"}
            alt="avtar"
          />
        </div>
        <div className="">
          <h2>Parth Thakor</h2>
          <p className="font-thin ">Your Money</p>
        </div>
      </div>
      <ul className="flex flex-col ps-2 mt-4  ">
        {
          navItems.map((item)=>{
            const classNames = `${
              active === item.id
                ? " relative  before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
                : ""
            }  px-2 my-2  text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer `;
            console.log(active , item.id)
            return <li className={classNames} key={item.id} onClick={()=>{activeHandler(item.id)}}>{item.icon}
                    <span className="ms-1">{item.title}</span>
                    </li>
          })
        }
      </ul>
      <div className="border absolute w-full bottom-5 ps-2">
        <li>
          {signout} Sign Out
        </li>
      </div>
    </div>
  );
}

export default Left;
