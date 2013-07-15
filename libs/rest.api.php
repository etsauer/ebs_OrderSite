<?php
    
	/* 
		This is an example class script proceeding secured API
		To use this class you should keep same as query string and function name
		Ex: If the query string value rquest=delete_user Access modifiers doesn't matter but function should be
		     function delete_user(){
				 You code goes here
			 }
		Class will execute the function dynamically;
		
		usage :
		
		    $object->response(output_data, status_code);
			$object->_request	- to get santinized input 	
			
			output_data : JSON (I am using)
			status_code : Send status message for headers
			
		Add This extension for localhost checking :
			Chrome Extension : Advanced REST client Application
			URL : https://chrome.google.com/webstore/detail/hgmloofddffdnphfgcellkdfbfbjeloo
		
 	*/
	
	require_once("Rest.inc.php");
	
	class API extends REST {
	
		public $data = "";
			
		public function __construct(){
			parent::__construct();				// Init parent contructor
		}
				
		/*
		 * Public method for access api.
		 * This method dynmically call the method based on the query string
		 *
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['rquest'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404);				// If the method not exist with in this class, response would be "Page not found".
		}
		
		private function calculate() {
			// Cross validation if the request method is GET else it will return "Not Acceptable" status
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
				
			$height = $this->_request['h'];
			$width  = $this->_request['w'];
			$qty    = $this->_request['q'];
			$grills = $this->_request['g'];
			
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
			
			$response = array(
				'unitPrice' => $unitPrice,
				'subtotal' => $subtotal,
				'shipping' => $shipping,
				'totalPrice' => $totalPrice,
			);

			$this->response($this->json($response), 200);
			
		}
				
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>