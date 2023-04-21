import { useEffect, useState } from "react";
import axios from "axios";
import { UnorderedList, ListItem, Center } from "@chakra-ui/react";

function LunchViewer() {
  let [foodList, setFL] = useState([]);
  const date = new Date();
  const dateString = `${date.getFullYear().toString()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}`;

  useEffect(() => {
    axios
      .get(
        "https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=H10&SD_SCHUL_CODE=7501034&Type=json&",
        {
          params: {
            MLSV_YMD: Number(dateString),
            KEY: process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((result) => {
        let food_data =
          result.data.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>");

        if (!food_data) {
          food_data = "정보가 없습니다.";
        }
        setFL(food_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Center>
      <UnorderedList>
        {foodList.map((food, index) => (
          <ListItem key={index.toString()}>{food}</ListItem>
        ))}
      </UnorderedList>
    </Center>
  );
}

export default LunchViewer;
