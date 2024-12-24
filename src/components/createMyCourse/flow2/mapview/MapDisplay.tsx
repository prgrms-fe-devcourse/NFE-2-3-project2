import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import SearchResultOfCreateMyItems from "./SearchResultOfCreateMyItems";

import images from "../../../../assets/images/importImages";

export default function MapDisplay({
  onNext,
}: {
  onNext: (location: FullLocationObj) => void;
}) {
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const infowindowRef = useRef<kakao.maps.InfoWindow | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<Place[]>([]); // 검색 결과 배열 타입 수정

  useEffect(() => {
    if (mapRef.current) return; // 이미 맵이 생성되어 있다면 early return

    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Map container element not found!");
      return;
    }

    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };

    mapRef.current = new kakao.maps.Map(mapContainer, mapOption);
    infowindowRef.current = new kakao.maps.InfoWindow({ zIndex: 1 });
  }, []);

  // 검색 유효성 검사 (입력하지 않음)
  function searchPlaces() {
    if (!keyword.trim()) {
      toast.error("키워드를 입력해주세요!");
      return;
    }
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
  }

  // 검색 유효성 검사 (검색 오류)
  function placesSearchCB(data: any, status: kakao.maps.services.Status) {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      toast.error("검색 결과가 존재하지 않습니다.");
    } else if (status === kakao.maps.services.Status.ERROR) {
      toast.error("검색 중 오류가 발생했습니다.");
    }
  }

  // 검색 결과를 맵에 표시하는 함수
  function displayPlaces(places: any[]) {
    setResult(places);
    const bounds = new kakao.maps.LatLngBounds();
    removeMarker();

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
      addMarker(placePosition, i);
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);
    }
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    mapRef.current?.setBounds(bounds);
  }

  // 마커를 추가하는 함수
  function addMarker(position: kakao.maps.LatLng, idx: number) {
    if (!mapRef.current) return null;

    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );

    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(mapRef.current);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  }

  // 마커를 제거하는 함수
  function removeMarker() {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  }

  const searchResults = result.map((place: any, index: number) => (
    <SearchResultOfCreateMyItems
      key={index}
      index={index}
      placeName={place.place_name}
      category={place.category_name}
      contact={place.phone}
      location={place.address_name}
      onSelect={() => {
        onNext({
          locationName: place.place_name,
          locationAddress: place.address_name,
          locationCategory: place.category_name,
          locationPhoneNum: place.phone,
          location_id: "",
          like: 0,
        });
      }}
    />
  ));

  return (
    <>
      <div
        id="map"
        className="w-[571px] h-[338px] mt-[38px] mb-[51px] shadow-default rounded-t-[20px]"
      ></div>
      <section className="w-[767px] rounded-t-[50px] bg-primary-100 flex flex-col items-center font-pretendard pt-[62px] min-h-[500px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchPlaces();
          }}
        >
          <div className="w-[415px] h-[47px] relative ">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="
                w-[415px] h-[47px] px-6 py-3 font-pretendard bg-custom-input/70 shadow-default rounded-[30px] 
                outline-none focus:outline-none focus:bg-white transition-all placeholder:text-sm placeholder:text-custom-gray/70
                placeholder:font-medium
              "
              placeholder="검색어를 입력해주세요"
            />
            <button type="submit">
              <img
                src={images.search_icon}
                alt="검색 아이콘"
                className="absolute top-[13px] left-[373px]"
              />
            </button>
          </div>
        </form>
        <section className="w-[416px] min-h-[11vh] flex flex-col items-center gap-[19px] mt-[39px]">
          {searchResults}
        </section>
      </section>
    </>
  );
}
