import {useParams, useLocation} from "react-router-dom";
import { useSearchParams } from "react-router-dom";


export default function Location(props) {
  let { productId } = useParams();
	const location = useLocation(); 
	let [searchParams, setSearchParams] = useSearchParams();
	let category = searchParams.get('category');

	return (<div> 
    <div id="divlocation">Location es: {location.pathname}</div>
		{productId && <div id="divproductid">ProductId es: {productId}</div>}
		{category && <div id="divsearch">Category {category}</div>}

	</div>)
}