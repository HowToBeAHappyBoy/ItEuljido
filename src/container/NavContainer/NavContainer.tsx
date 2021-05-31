import Nav from "components/Nav/Nav";
import useSearch from "hook/search/useSearch";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "atom/user";
import NavElemnetItem from "components-element/NavElement/NavElementItem";
import { coordsAtom } from "atom/coords";
import { useCallback } from "react";
import { MapSingleton } from "container/MapContainer/MapContainer";

declare global {
  interface Window {
    kakao: any;
  }
}

const NavContainer = () => {
  const { filterItem, search, onChangeSearch } = useSearch();
  const user = useRecoilValue(userAtom);
  const selectEelement = useSetRecoilState(coordsAtom);
  const filterUserList = filterItem(user, "name");

  const userSelector = useCallback(
    (coords) => {
      MapSingleton.getInstance().map.setCenter(coords);
      MapSingleton.getInstance().map.setLevel(4);
      selectEelement(coords);
    },
    [selectEelement]
  );

  return (
    <Nav search={search} onChangeSearch={onChangeSearch}>
      {filterUserList.map((data: any, index: number) => (
        <NavElemnetItem
          key={index}
          data={data}
          index={index}
          userSelector={userSelector}
        />
      ))}
    </Nav>
  );
};

export default NavContainer;