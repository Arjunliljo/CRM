import NormalButton from "../../../components/buttons/NormalButton";
import Selector from "../../../components/Selectors/Selector";
import NextBtn from "../../../components/buttons/NextBtn";
import { useApi } from "../../../context/apiContext/ApiContext";
import { useEffect, useState } from "react";
import { getCountryId } from "../../../service/IdFinders";
import { useRef } from "react";

export default function StartOtherApplicationModal({ curStudent }) {
  const { universityConfigs, countryConfigs } = useApi();
  const { university } = universityConfigs;
  const { countries } = countryConfigs;

  const [curCountry, setCurCountry] = useState("All Countries");
  const universityList = useRef(university);
  const courseList = useRef(university?.map((obj) => obj?.courses)?.flat());
  const [curUniversity, setCurUniversity] = useState("All Universities");

  const [curCourse, setCurCourse] = useState("All Courses");

  useEffect(() => {
    if (curCountry?.startsWith("All")) return;
    universityList.current = university?.filter(
      (obj) => obj?.country === getCountryId(curCountry, countries)
    );
  }, [curCountry, university, countries]);

  useEffect(() => {
    if (curUniversity?.startsWith("All")) return;
    courseList.current =
      university?.find((uni) => uni.name === curUniversity)?.courses || [];
  }, [curUniversity, university]);

  return (
    <div className="assign-form">
      <NormalButton
        style={{ margin: "0 auto" }}
      >{`Start New Application for ${curStudent?.name}`}</NormalButton>
      <div className="assign-form-head">
        <Selector
          set={curCountry}
          onSet={setCurCountry}
          redux={false}
          placeholder={"Select Country"}
          optionsObj={countries}
        />
        <Selector
          set={curUniversity}
          onSet={setCurUniversity}
          redux={false}
          placeholder={
            universityList.current.length > 0
              ? "Select University"
              : "No University Found"
          }
          optionsObj={universityList.current}
          disabled={universityList.current.length === 0}
        />
      </div>
      <Selector
        redux={false}
        placeholder={
          courseList.current.length > 0 ? "Select Course" : "No Course Found"
        }
        optionsObj={courseList.current}
        disabled={courseList.current.length === 0}
        set={curCourse}
        onSet={setCurCourse}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <NextBtn style={{ margin: "0 auto" }}>Create</NextBtn>
      </div>
    </div>
  );
}
