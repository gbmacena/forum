import dayjs from "dayjs";

const formatarData = (dataPost) => {
  const data = dayjs(dataPost).format("DD/MM/YYYY - HH:mm");
  return data;
};

export default formatarData;
