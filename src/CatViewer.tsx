import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ImageLayer from './components/ImageLayer';
import Loader from './assets/images/loading.svg?react';

export interface Image {
  breeds: [];
  categories?: [];
  id: number;
  width: number;
  height: number;
  url: string;
}

interface error {
  code: number;
  msg: string;
}

// Intersection Observer 설정
const useInfiniteScroll = (fetchData: () => void, isLoading: boolean) => {
  const IsInitialData = useRef(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchData();
        }
      },
      { rootMargin: '100px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, fetchData]);

  useEffect(() => {
    if (!IsInitialData.current) {
      fetchData();
      IsInitialData.current = true;
    }
  }, [fetchData]);

  return { observerRef };
};

function CatViewer() {
  const IMG_API = 'https://api.thecatapi.com/v1/images/search';
  const API_KEY = 'live_k77YJ1Sa3RsUfqEwbuKzrsevPSBW7iCoeeTZKSuj0ahl51TyYwbMXoLhVwwyIIvF';
  const limit = 30;
  const [columnCount, setColumnCount] = useState(3);

  const BREAKPOINT = {
    lg: 1200,
    md: 750,
    sm: 500,
  };

  const [error, setError] = useState<error>(null);

  const [imgs, setImgs] = useState<Image[]>([]);
  const [slicedData, setSlicedData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<Image | null>(null);

  const gridRef = useRef<any>(null);

  const sliceByColumns = (data: Image[], columnCount: number) => {
    const result: Image[][] = Array.from({ length: columnCount }, () => []);
    data.forEach((item: Image, index: number) => {
      const targetIndex = index % columnCount;
      result[targetIndex].push(item);
    });

    return result;
  };

  // 화면 리사이즈 시 컬럼 수 업데이트
  const calculateColumnCount = () => {
    const containerWidth = gridRef.current.offsetWidth;
    if (containerWidth >= BREAKPOINT.md) {
      setColumnCount(3); // 750 이상: 3 컬럼
    } else if (containerWidth >= BREAKPOINT.sm) {
      setColumnCount(2); // 500 이상: 2 컬럼
    } else {
      setColumnCount(1); // 500 미만: 1 컬럼
    }
  };

  // 추가로 로드한 데이터 추가
  const appendImages = (newImages: Image[]) => {
    setImgs((prevImages) => {
      return [...prevImages, ...newImages];
    });
  };

  // 데이터 페치
  const fetchData = async () => {
    if (isLoading || error) return;
    setIsLoading(true);

    axios
      .get(IMG_API, {
        params: {
          limit: limit,
          page: page,
          api_key: API_KEY,
        },
      })
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          // 응답 성공
          // console.log('서버 응답 성공:', response.data);

          // 데이터 저장
          const newImages = response.data;
          // setImgs((prevImages) => [...prevImages, ...newImages]);
          // const newImages = await fetchMoreImages();
          appendImages(newImages); // 기존 데이터를 유지하며 추가
          setPage((prevPage) => prevPage + 1);

          // 에러 데이터 초기화
          setError(null);
        }
      })
      .catch(function (error) {
        setImgs([]); // 에러 발생시 이미지 데이터 초기화
        setError({ code: error.status, msg: '이미지 데이터 로드에 실패했습니다. 다시 시도해 주세요.' });

        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
        throw new Error('네트워크 또는 서버 이상으로 인해 데이터를 받아올 수 없습니다.');
      })
      .finally(function () {
        setIsLoading(false);
      });
  };

  // 이미지 클릭 시 전체화면 레이어 오픈
  const openModal = (image: Image) => {
    setIsClosing(false);
    setIsModalOpen(true);
    setOpenImage(image);
  };

  // 이미지 전체화면 레이어 닫기
  const closeModal = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setOpenImage(null);
      setIsClosing(false);
    }, 300);
  };

  const { observerRef } = useInfiniteScroll(fetchData, isLoading);

  useEffect(() => {
    console.log(slicedData);
  }, [slicedData]);

  useEffect(() => {
    setSlicedData(sliceByColumns(imgs, columnCount));
  }, [imgs, columnCount]);

  useEffect(() => {
    // 첫 로드 시 그리드 크기 확인
    calculateColumnCount();

    // 화면 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', calculateColumnCount);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', calculateColumnCount);
    };
  }, []);

  return (
    <div id="wrap">
      <h1>1번 과제 - CatViewer</h1>

      {!isLoading && error && <div>{error.msg}</div>}

      <div className="grid">
        <div className="grid-container" data-column={columnCount} ref={gridRef}>
          {!error &&
            slicedData &&
            slicedData.length > 0 &&
            slicedData.map((columnData: any[], index: number) => {
              return (
                <div className="grid-column" key={index}>
                  {columnData.map((img: Image, index: number) => {
                    return (
                      <div className="grid-item" key={index} data-index={index} onClick={() => openModal(img)}>
                        <img src={img.url} alt={`${img.id}`} loading="lazy" width={img.width} height={img.height} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
        <div ref={observerRef} style={{ height: '100px' }} />
        {isLoading && <Loader />}
      </div>

      <ImageLayer isModalOpen={isModalOpen} isClosing={isClosing} openImage={openImage} closeModal={closeModal} />
    </div>
  );
}

export default CatViewer;
