import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../pages/_app'
import { getDate2, getPrice } from '../../../commons/libraries/utils'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  z-index: 100000;
  width: 170px;
  padding: 20px 15px;
  position: fixed;
  right: 30px;
  /* left: 100vw; */
  top: 50%;
  transform: translate(0, -50%);
  overflow: hidden;
  color: #8054fd;
  background: #333333;
  p {
    font-weight: 700;
  }
  > div:last-child {
    margin-bottom: 5px;
  }
  border: 2px solid #8054fd;
`
const ImgContainer = styled.div`
  width: 45px;
  height: 45px;
  overflow: 'hidden';
  img {
    height: 100%;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
  }
`
const Items = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 5px;
  margin: 15px 0;
  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

export default function RecentViewComponent() {
  const router = useRouter()
  const { item, setItem } = useContext(GlobalContext)
  const todayDate = getDate2(new Date())

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem(todayDate) || '[]')
    if (baskets) {
      setItem(baskets)
    }
  }, [])

  const onClickDetail = (el) => () => {
    router.push(`/market/${el._id}`)
  }

  return (
    <>
      {item ? (
        <Wrapper>
          <>
            <p>오늘 본 상품</p>
            {item
              .map((el) => (
                <Items
                  key={el._id}
                  onClick={onClickDetail(el)}
                  style={{ cursor: 'pointer' }}
                >
                  <ImgContainer>
                    <img
                      src={`https://storage.googleapis.com/${el.images[0]}`}
                      onError={(e) => {
                        e.currentTarget.src = '/images/uploadImg.png'
                      }}
                    />
                  </ImgContainer>
                  <div>
                    <div>{el.name}</div>
                    <div>{getPrice(el.price)}</div>
                  </div>
                </Items>
              ))
              .filter((el: any, index: any) => {
                if (index <= 3) return el
              })}
          </>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  )
}
