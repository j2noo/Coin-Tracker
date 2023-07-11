import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { styled } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Discription = styled.span``;
const InfoBox = styled.div`
  display: flex;
  justify-content: center; //good
  max-width: inherit;
  background-color: ${(props) => props.theme.innerBgColor};
  border-radius: 15px;
  margin: 15px;
  div {
    padding: 10px 15px;
    text-align: center;
    & :first-child {
      font-size: 12px;
    }
    & :nth-child(2) {
    }
  }
`;
const NavBox = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 2px solid black;
  li {
    float: left;
    font-size: 30px;
  }
`;
const NavItem = styled(Link)<{ isActive: boolean }>`
  margin-right: 10px;
  list-style-type: none;
  text-decoration: none;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  &:hover {
    color: red;
  }
`;
const Rank = styled.div``;
const Symbol = styled.div``;
const Type = styled.div``;
const HardwareWallet = styled.div``;
const MaxSupply = styled.div``;
const TotalSupply = styled.div``;
const PriceLive = styled.div``;
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  //tags: object;
  //team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  //links: object;
  //links_extended: object;
  whitepaper: object;
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
  // const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 100000 }
  );

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  console.log(infoData);
  console.log(tickersData);
  console.log(priceMatch);
  console.log(chartMatch);

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>로딩 jung</Loader>
      ) : (
        <>
          <InfoBox>
            <Rank>
              <div> Rank</div>
              <div>{infoData?.rank}</div>
            </Rank>
            <Symbol>
              <div> Symbol</div>
              <div>{infoData?.symbol}</div>
            </Symbol>
            <Type>
              <div> Coin Type</div>
              <div>{infoData?.type}</div>
            </Type>
            <HardwareWallet>
              <div>Hardware Wallet</div>
              <div>{String(infoData?.hardware_wallet)}</div>
            </HardwareWallet>
          </InfoBox>
          <Discription>{infoData?.description}</Discription>

          <InfoBox>
            <MaxSupply>
              <div> Max Supply</div>
              <div>{tickersData?.max_supply}</div>
            </MaxSupply>
            <TotalSupply>
              <div> Total Supply</div>
              <div>{tickersData?.total_supply}</div>
            </TotalSupply>{" "}
            <PriceLive>
              <div> Total Supply</div>
              <div>{tickersData?.quotes.USD.price}</div>
            </PriceLive>
          </InfoBox>
          <NavBox>
            <NavItem to={`/${coinId}/price`} isActive={priceMatch !== null}>
              <li>Price</li>
            </NavItem>
            <NavItem to={`/${coinId}/chart`} isActive={chartMatch !== null}>
              <li>Chart</li>
            </NavItem>
          </NavBox>
        </>
      )}

      <Switch>
        <Route path={`/${coinId}/price`}>
          <Price></Price>
        </Route>
        <Route path={`/:coinId/chart`}>
          <Chart coinId={coinId}></Chart>
        </Route>
      </Switch>
    </Container>
  );
}
export default Coin;
