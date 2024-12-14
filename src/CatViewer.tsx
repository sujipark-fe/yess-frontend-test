import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Loader from './assets/images/loading.svg?react';
import './assets/style/cat.scss';

interface Image {
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

function CatViewer() {
  const IMG_API = 'https://api.thecatapi.com/v1/images/search';
  const API_KEY = 'live_k77YJ1Sa3RsUfqEwbuKzrsevPSBW7iCoeeTZKSuj0ahl51TyYwbMXoLhVwwyIIvF';
  const limit = 30;
  const [arrayNum, setArrayNum] = useState(3);

  const BREAKPOINT = {
    lg: 1200,
    md: 750,
    sm: 450,
  };

  const [error, setError] = useState<error>({ code: 0, msg: '' });

  const [imgs, setImgs] = useState<Image[]>([]);
  const [slicedData, setSlicedData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const gridRef = useRef<any>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const sliceByColumns = (data: Image[], columnCount: number) => {
    const chunkSizes = { 1: 30, 2: 15, 3: 10 };
    const chunkSize = chunkSizes[columnCount];

    const result: Image[][] = Array.from({ length: columnCount }, () => []);

    data.forEach((item: Image, index: number) => {
      const targetIndex = index % columnCount;
      result[targetIndex].push(item);
    });

    return result;
  };

  const checkGridSize = () => {
    const containerWidth = gridRef.current.offsetWidth;

    if (containerWidth >= BREAKPOINT.md) {
      setArrayNum(3);
    } else if (containerWidth >= BREAKPOINT.sm) {
      setArrayNum(2);
    } else {
      setArrayNum(1);
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
    if (isLoading) return;
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
          setError({ code: 0, msg: '' });
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

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
  }, [page, isLoading]);

  useEffect(() => {
    console.log(slicedData);
  }, [slicedData]);

  useEffect(() => {
    setSlicedData(sliceByColumns(imgs, arrayNum));
  }, [imgs, arrayNum]);

  useEffect(() => {
    fetchData();

    // 첫 로드 시 그리드 크기 확인
    checkGridSize();

    // 화면 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkGridSize);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', checkGridSize);
    };
  }, []);

  return (
    <div id="wrap">
      <h1>1번 과제 - CatViewer</h1>

      {!isLoading && error && <div>{error.msg}</div>}

      <div className="grid">
        <div className="grid-container" data-column={arrayNum} ref={gridRef}>
          {
            // !isLoading &&
            !error.msg &&
              slicedData &&
              slicedData.length > 0 &&
              slicedData.map((columnData: any[], index: number) => {
                return (
                  <div className="grid-column" key={index}>
                    {columnData.map((img: Image, index: number) => {
                      return (
                        <div className="grid-item" key={index} data-index={index}>
                          <img src={img.url} alt={`${img.id}`} loading="lazy" width={img.width} height={img.height} />
                        </div>
                      );
                    })}
                  </div>
                );
              })
          }
          <div ref={observerRef} style={{ height: '20px' }} />
        </div>
        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default CatViewer;
