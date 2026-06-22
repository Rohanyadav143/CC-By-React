function Button({value, onClick}) {

  return (
    <>
      <button className="bg-yellow-700 p-2 pl-4 pr-4 text-lg rounded-md text-white cursor-pointer hover:bg-yellow-800 mt-5" onClick={onClick}>
        {value}
      </button>
    </>
  )
}

export default Button;
