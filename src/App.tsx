import * as React from 'react'
import { useQuery } from 'urql'

const RocketsQuery = `
  query Rokets{
    rockets {
      id
      active
      name
      company
      wikipedia
    }
  }
`
interface RocketType {
  id: string
  active: string
  name: string
  company: string
  wikipedia: string
}

interface FetchRocketsData {
  rockets: RocketType[]
}

function App(): JSX.Element {
  const [{ data, fetching, error }] = useQuery<FetchRocketsData>({
    query: RocketsQuery,
  })
  const [rocket, setRocket] = React.useState<RocketType | null>(null)

  React.useEffect(() => {
    if (data) {
      const { rockets } = data
      setRocket(rockets[Math.floor(Math.random() * rockets.length)])
    }
  }, [data])

  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-800 h-screen flex justify-center items-center text-white flex-col w-full mx-auto">
      <header className="text-center px-10 pb-10 w-96">
        <svg
          viewBox="0 0 75 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M65.6866 26.8557C64.3657 26.4107 62.982 26.1832 61.589 26.182C58.6637 26.1849 55.8278 27.1966 53.5546 29.0483C51.7361 27.5624 49.5435 26.6127 47.2206 26.3047L46.7287 26.2445C46.3216 26.206 45.9031 26.1821 45.4846 26.1821C42.5497 26.1871 39.7053 27.2045 37.4264 29.0645C35.1475 27.2045 32.3032 26.1871 29.3683 26.1821C28.8793 26.1846 28.3907 26.213 27.9046 26.2672L27.6603 26.3009C25.3288 26.6064 23.1273 27.5569 21.3011 29.0463C19.9326 27.9379 18.3524 27.124 16.6582 26.6551C14.9641 26.1862 13.1923 26.0724 11.4526 26.3206C9.71294 26.5689 8.04252 27.1739 6.54494 28.0982C5.04735 29.0225 3.75454 30.2464 2.74666 31.6939C1.73878 33.1415 1.03733 34.7818 0.685797 36.5133C0.334269 38.2447 0.34016 40.0303 0.703105 41.7594C1.06605 43.4884 1.77831 45.124 2.79572 46.5648C3.81313 48.0056 5.11399 49.2208 6.61764 50.1351C5.89908 51.8671 5.56556 53.7361 5.64044 55.6114C5.71532 57.4866 6.19679 59.3227 7.05114 60.9912C7.90549 62.6596 9.11209 64.1202 10.5865 65.2705C12.0609 66.4209 13.7674 67.2333 15.5867 67.6508C15.1249 69.3268 15.0055 71.0795 15.2355 72.8032C15.4655 74.5268 16.0403 76.1858 16.925 77.68C17.8098 79.1743 18.9863 80.4728 20.3836 81.4974C21.7809 82.5219 23.37 83.2513 25.0551 83.6414C24.5269 85.5589 24.4464 87.5732 24.8201 89.527C25.1937 91.4809 26.0112 93.3215 27.2089 94.9051C28.4065 96.4888 29.9519 97.7726 31.7244 98.6564C33.4968 99.5401 35.4484 100 37.4267 100C39.4051 100 41.3566 99.5401 43.1291 98.6564C44.9015 97.7726 46.4469 96.4888 47.6446 94.9051C48.8423 93.3215 49.6598 91.4809 50.0334 89.527C50.407 87.5732 50.3266 85.5589 49.7984 83.6414C51.4835 83.2512 53.0726 82.5219 54.4699 81.4973C55.8672 80.4727 57.0436 79.1742 57.9284 77.6799C58.8132 76.1857 59.3879 74.5267 59.6179 72.803C59.8479 71.0794 59.7285 69.3267 59.2668 67.6507C61.0859 67.2332 62.7924 66.4209 64.2668 65.2706C65.7411 64.1203 66.9477 62.6599 67.8021 60.9916C68.6565 59.3232 69.138 57.4872 69.213 55.6121C69.288 53.737 68.9546 51.868 68.2362 50.1361C70.3301 48.8616 72.018 47.0116 73.1011 44.8043C74.1841 42.5969 74.6172 40.1242 74.3493 37.6775C74.0813 35.2308 73.1235 32.9122 71.5887 30.9948C70.0539 29.0775 68.0061 27.6413 65.6866 26.8557L65.6866 26.8557ZM46.4014 30.6768L46.6198 30.7061C48.6662 30.978 50.5398 32.0027 51.8791 33.5823C52.208 33.9672 52.5025 34.3804 52.7592 34.8174C53.5146 36.1246 53.9099 37.6107 53.9046 39.1226C53.8993 40.6345 53.4935 42.1178 52.729 43.4196C52.4767 43.8404 52.1902 44.2395 51.8726 44.6128C50.5761 46.1252 48.7914 47.1301 46.8318 47.4511C46.6835 47.4788 46.5254 47.4956 46.4014 47.5103C46.0969 47.5429 45.7909 47.5601 45.4846 47.5618C43.6231 47.56 41.8147 46.9376 40.3424 45.7921C41.5359 43.8121 42.1792 41.5464 42.2054 39.2312C42.2316 36.916 41.6396 34.6361 40.4913 32.6294L40.351 32.3886C41.8218 31.2471 43.6268 30.6271 45.4846 30.6253C45.7909 30.627 46.0969 30.6442 46.4014 30.6768V30.6768ZM37.6616 63.547H37.2236C35.7765 63.5094 34.3634 63.0977 33.1204 62.3516C31.8775 61.6055 30.8464 60.5501 30.1266 59.287L30.0457 59.1552C29.9943 59.0714 29.9487 58.984 29.9092 58.8938C29.3079 57.718 28.9984 56.4133 29.007 55.0911C29.0062 54.0298 29.207 52.978 29.5986 51.9924C32.4528 51.9395 35.2078 50.9298 37.4267 49.1234C39.6461 50.9302 42.4019 51.94 45.2568 51.9925C45.6995 53.1148 45.8969 54.3197 45.8356 55.5255C45.7743 56.7312 45.4558 57.9096 44.9016 58.9806C44.8747 59.0411 44.8434 59.0995 44.8078 59.1553L44.7269 59.2871C44.0108 60.5465 42.985 61.5997 41.7478 62.3457C40.5106 63.0916 39.1035 63.5053 37.6616 63.547V63.547ZM28.2617 30.7023L28.4397 30.6767C28.7395 30.6464 29.0588 30.6252 29.3683 30.6252C30.5784 30.6254 31.7742 30.8878 32.8745 31.3944C33.9747 31.901 34.9536 32.64 35.7444 33.5611C36.0807 33.9472 36.3777 34.3663 36.631 34.8119L36.8969 35.2865C37.4829 36.469 37.7881 37.7722 37.7883 39.0935C37.7889 40.2057 37.5715 41.3071 37.1485 42.3348C36.7256 43.3625 36.1054 44.2962 35.3234 45.0827C34.5414 45.8692 33.613 46.4929 32.5912 46.9183C31.5694 47.3436 30.4742 47.5623 29.3683 47.5618C29.0598 47.5618 28.7508 47.5407 28.4844 47.514C28.3269 47.4956 28.17 47.4787 27.9678 47.4413C26.0291 47.1164 24.2666 46.114 22.9906 44.6106C22.6657 44.2399 22.3751 43.8401 22.1224 43.4163C21.3614 42.1188 20.9564 40.6414 20.949 39.135C20.9415 37.6287 21.3317 36.1473 22.0797 34.8422C22.3458 34.3864 22.6552 33.9575 23.0036 33.5617C24.3418 31.9842 26.2164 30.9647 28.2617 30.7023V30.7023ZM10.5647 31.0711C11.8789 30.6384 13.2781 30.5341 14.6414 30.7672C16.0047 31.0004 17.291 31.5639 18.3891 32.4092C18.352 32.4697 18.3144 32.5182 18.2772 32.5806C17.126 34.5711 16.5232 36.8343 16.531 39.137C16.5388 41.4397 17.1568 43.6987 18.3214 45.6813C18.3448 45.7212 18.3744 45.7593 18.3983 45.799C16.9273 46.9403 15.1222 47.5601 13.2644 47.5618C12.1574 47.5662 11.0606 47.3502 10.037 46.9262C9.01347 46.5022 8.08352 45.8786 7.30077 45.0914C6.51803 44.3041 5.89798 43.3688 5.47638 42.3394C5.05479 41.31 4.83999 40.2069 4.84437 39.0936C4.84058 37.3219 5.39094 35.5939 6.41755 34.1541C7.44415 32.7144 8.89499 31.6358 10.5647 31.0711L10.5647 31.0711ZM10.048 55.0911C10.0514 53.9408 10.2888 52.8032 10.7457 51.7486C11.575 51.9164 12.4185 52.0023 13.2644 52.005C16.1931 52.0002 19.0319 50.9873 21.3088 49.1347C22.4616 50.0764 23.7691 50.8083 25.1723 51.2975C24.3018 54.0744 24.4083 57.0681 25.4739 59.7754C24.7345 60.904 23.735 61.8363 22.5604 62.493C21.3858 63.1496 20.0709 63.5112 18.7275 63.547H18.4676C16.237 63.5459 14.0978 62.6551 12.5194 61.0699C10.941 59.4847 10.0522 57.3346 10.0481 55.0912L10.048 55.0911ZM19.5396 71.0758C19.5356 69.9753 19.7469 68.8848 20.1614 67.8663C23.1642 67.4737 25.9283 66.014 27.9543 63.7507C29.7106 65.6819 32.007 67.0331 34.5414 67.6267C33.7764 70.311 33.9183 73.1746 34.9448 75.7691C34.1997 76.8935 33.1984 77.8226 32.0242 78.4792C30.8501 79.1358 29.537 79.5009 28.1942 79.5441H27.9596C25.7273 79.5415 23.5871 78.6485 22.0086 77.0609C20.4301 75.4734 19.5422 73.321 19.5397 71.0758L19.5396 71.0758ZM37.4265 95.5293C35.1942 95.5266 33.0541 94.6335 31.4758 93.046C29.8974 91.4585 29.0095 89.3061 29.007 87.061C29.0035 85.9645 29.2146 84.8779 29.6283 83.8634C32.6262 83.4551 35.3866 82.0015 37.4281 79.7562C39.4703 81.9982 42.2286 83.4503 45.2242 83.8604C45.6387 84.8758 45.8501 85.9634 45.8465 87.061C45.844 89.3062 44.9561 91.4586 43.3775 93.0462C41.799 94.6337 39.6588 95.5267 37.4265 95.5293V95.5293ZM46.8938 79.5441L46.7088 79.5446C45.2519 79.506 43.8294 79.0904 42.5787 78.338C41.3279 77.5856 40.291 76.5217 39.568 75.249C39.506 75.1426 39.4537 75.0456 39.3922 74.9224C38.8394 73.837 38.5282 72.6435 38.4803 71.4248C38.4324 70.2062 38.6489 68.9917 39.1149 67.8658C42.1096 67.4553 44.8654 65.9987 46.8999 63.7507C48.9276 66.0098 51.6899 67.4676 54.6905 67.8621C55.1061 68.8818 55.3179 69.9738 55.3138 71.0758C55.3113 73.321 54.4234 75.4734 52.8448 77.061C51.2663 78.6485 49.1261 79.5416 46.8938 79.5441V79.5441ZM56.3853 63.547H56.1644C54.8144 63.5156 53.492 63.1559 52.3102 62.4988C51.1283 61.8416 50.1223 60.9065 49.378 59.7733C50.4438 57.0655 50.5518 54.0715 49.6838 51.2932C51.0859 50.8029 52.3929 50.0719 53.5467 49.1327C55.8212 50.9883 58.6602 52.0023 61.589 52.005C62.4348 52.0024 63.2784 51.9164 64.1075 51.7484C64.6646 53.0343 64.894 54.4396 64.7747 55.8371C64.6555 57.2346 64.1914 58.5801 63.4246 59.7517C62.6578 60.9233 61.6124 61.884 60.3833 62.5467C59.1541 63.2094 57.78 63.5532 56.3853 63.547V63.547ZM64.4758 47.0585C63.5497 47.3927 62.573 47.563 61.589 47.5618C59.7312 47.5616 57.926 46.9407 56.4571 45.7967C56.4795 45.7596 56.508 45.7222 56.5299 45.6851C57.698 43.6981 58.3169 41.4331 58.3224 39.1247C58.328 36.8163 57.7202 34.5484 56.5617 32.5556C56.5308 32.5038 56.4985 32.4616 56.4675 32.4109C57.5643 31.5656 58.8494 31.0017 60.2116 30.7681C61.5738 30.5344 62.972 30.6381 64.2855 31.07C65.9377 31.6331 67.3754 32.698 68.4004 34.1177C69.4253 35.5375 69.987 37.2421 70.0079 38.9965C70.0288 40.7508 69.5079 42.4685 68.517 43.9125C67.5261 45.3565 66.1142 46.4557 64.4758 47.0585V47.0585Z" />
          <path d="M58.9796 4.44322C53.8741 4.44911 48.9794 6.49151 45.3692 10.1223C41.7591 13.7532 39.7283 18.676 39.7225 23.8107C39.7225 24.3999 39.4897 24.965 39.0755 25.3816C38.6612 25.7983 38.0994 26.0323 37.5135 26.0323C36.9277 26.0323 36.3658 25.7983 35.9516 25.3816C35.5373 24.965 35.3046 24.3999 35.3046 23.8107C35.3116 17.4979 37.8082 11.4456 42.2466 6.98179C46.685 2.51794 52.7028 0.0070533 58.9796 0C59.5655 0 60.1273 0.234062 60.5416 0.650695C60.9558 1.06733 61.1886 1.6324 61.1886 2.22161C61.1886 2.81082 60.9558 3.37589 60.5416 3.79253C60.1273 4.20916 59.5655 4.44322 58.9796 4.44322V4.44322Z" />
          <path d="M3.11027 4.18938L3.99255 3.83521C9.53993 1.61975 15.7346 1.70759 21.2176 4.07947C26.7007 6.45135 31.0245 10.9136 33.2407 16.4874L33.5923 17.3737C33.6998 17.6447 33.7532 17.9344 33.7494 18.2261C33.7456 18.5179 33.6847 18.8061 33.5701 19.0742C33.4556 19.3423 33.2897 19.585 33.0819 19.7886C32.8741 19.9922 32.6284 20.1527 32.3589 20.2608L31.4767 20.6144C28.8347 21.6766 26.0157 22.2228 23.1704 22.2237C18.6621 22.224 14.2571 20.8653 10.5241 18.323C6.79105 15.7807 3.90138 12.1714 2.22802 7.96114L1.87694 7.07489C1.66018 6.52774 1.66833 5.91642 1.89961 5.37533C2.13088 4.83423 2.56635 4.40765 3.11027 4.18938V4.18938ZM28.6108 16.9295C26.7134 12.995 23.4711 9.87891 19.477 8.15107C15.4829 6.42322 11.0038 6.19908 6.8589 7.51963C8.75987 11.451 12.0025 14.5642 15.9955 16.2916C19.9885 18.0189 24.4657 18.2453 28.6108 16.9295V16.9295Z" />
        </svg>
      </header>
      <h1 className="text-6xl font-semibold pt-4">
        Hello <i className="font-extrabold capitalize">vid!</i>
      </h1>
      {fetching ? (
        <p>Loading...</p>
      ) : rocket ? (
        <p className="text-lg font-medium">
          {`Powered by ${rocket.company} `}
          <a
            className="underline text-lg"
            href={rocket.wikipedia}
            target="_blank"
            rel="noreferrer"
          >
            <i>{rocket.name}</i>
          </a>
        </p>
      ) : null}
      <button
        className="hover:bg-white hover:cursor-pointer hover:text-indigo-600 hover:font-semibold border p-2 w-52 mt-3 mb-4 rounded-lg"
        onClick={() =>
          data &&
          setRocket(
            data.rockets[Math.floor(Math.random() * data.rockets.length)]
          )
        }
      >
        Set New Rocket
      </button>
      <p className="text-xs py-1">
        <a
          className="underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {' | '}
        <a
          className="underline"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
      </p>
    </div>
  )
}

export default App