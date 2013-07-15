<?php
header("Content-type: text/xml");

$height = $_GET['h'];
$width  = $_GET['w'];
$qty    = $_GET['q'];
$grills = $_GET['g'];

switch ($grills) {
	case "stdnone" :
		$rate = 0.13;
		break;
	case "std" :
		$rate = 0.142;
		break;
	case "prarie":
		$rate = 0.152;
		break;
	case "roundtop":
		$rate = 0.162;
		break;
	default:
		$grills = "default";
		$rate = 0.13;
}

$unitPrice = round($height * $width * $rate, 2);
$subtotal = $unitPrice * $qty;
$shipping = ($subtotal > 85) ? 'FREE' : round(15, 2);
$totalPrice = $subtotal + $shipping;

$resultsXML = '';
$resultsXML .= '<prices>';
$resultsXML .= '<grills>' . $grills . ' : ' . $rate . '</grills>';
$resultsXML .= '<unit>' . $unitPrice . '</unit>';
$resultsXML .= '<subtotal>' . $subtotal . '</subtotal>';
$resultsXML .= '<shipping>' . $shipping . '</shipping>';
$resultsXML .= '<total>' . $totalPrice . '</total>';
$resultsXML .= '</prices>';

print($resultsXML);