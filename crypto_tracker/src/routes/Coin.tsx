import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const baseColor = "#1f2831b0";

const Container = styled.div`
  padding: 0px 40px;
  max-width: 540px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const CoinsList = styled.ul`
  margin: 20px 0;
`;

const Loader = styled.span`
  text-align: center;
  font-size: 32px;
  display: block;
`;

const CoinInfo = styled.div``;

const CoinRank = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: 70px;
  background-color: ${baseColor};
  opacity: 0.8;
  border-radius: 12px;
  margin: 15px 0;
  justify-items: center;
  align-items: center;
`;

const CoinDesc = styled.div`
  line-height: 20px;
  font-size: 16px;
`;

const CoinPrice = styled.div`
  display: flex;
  height: 70px;
  background-color: ${baseColor};
  opacity: 0.8;
  border-radius: 12px;
  margin: 15px 0;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
`;

const CoinContent = styled.div`
  display: block;
  text-align: center;
  font-size: 16px;
  line-height: 26px;
`;

const MenuBtn = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Btn = styled.div<{ isActive: boolean }>`
  background-color: ${baseColor};
  opacity: 0.8;
  border-radius: 8px;
  display: block;
  width: 45%;
  text-align: center;
  font-size: 18px;
  line-height: 27px;
  text-transform: uppercase;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 5000,
    }
  );

  /* const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState<PriceData>();
  const [info, setInfo] = useState<InfoData>();
  const COIN_URL = `https://api.coinpaprika.com/v1/coins/${coinId}`;
  const PRICE_URL = `https://api.coinpaprika.com/v1/tickers/${coinId}`;

  useEffect(() => {
    (async () => {
      const coinInfo = await (await fetch(COIN_URL)).json();
      const priceData = await (await fetch(PRICE_URL)).json();
      setInfo(coinInfo);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [COIN_URL, PRICE_URL]); */
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Anonymous" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Anonymous" : infoData?.name}
        </Title>
      </Header>
      <CoinsList>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinInfo>
            <CoinRank>
              <CoinContent>
                RANK:
                <br />
                {infoData?.rank}
              </CoinContent>
              <CoinContent>
                SYMBOL:
                <br />
                {infoData?.symbol}
              </CoinContent>
              <CoinContent>
                PRICE: ($)
                <br />
                {priceData?.quotes.USD.price.toFixed(3)}
              </CoinContent>
            </CoinRank>
            <CoinDesc>{infoData?.description}</CoinDesc>
            <CoinPrice>
              <CoinContent>
                TOTAL SUPLY:
                <br />
                {priceData?.total_supply}
              </CoinContent>
              <CoinContent>
                MAX SUPPLY:
                <br />
                {priceData?.max_supply}
              </CoinContent>
            </CoinPrice>

            <MenuBtn>
              <Btn isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Btn>
              <Btn isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Btn>
            </MenuBtn>

            <Switch>
              {/* <Route path={`/${coinId}/price`}> */}
              <Route path={`/:coinId/price`}>
                <Price />
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId} />
              </Route>
            </Switch>
          </CoinInfo>
        )}
      </CoinsList>
    </Container>
  );
}

export default Coin;
