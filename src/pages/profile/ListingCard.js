import React from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import Bed from '../../assets/bed.jpg'

import { ERC721ABI } from "../../Redux/constants/erc721ABI";
import { ethers } from "ethers";


function ListingCard({ property }) {

	const ListTokens = async () => {
		try {
		
		if (window.ethereum) {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			  });
			  const address = accounts[0];
			  let provider = new ethers.providers.Web3Provider(window.ethereum);
			let signer = provider.getSigner();
			const ERC721 = new ethers.Contract(
				ERC721ContractAddress,
				ERC721ABI,
				signer,
				{ gas: 2100000, gasPrice: 800000000 }
			);
			let tx= await ERC721.listForsale(quantity,pricePerToken)
			ERC721.on("ListToken", (quantity, pricePerToken) => {
				console.log(`quantity: ${quantity} ,pricePerToken:${pricePerToken}`)
			})
			} 
		else {
			console.alert("Please Install MetaMask Extension")
			}
		}
		catch (error) {
			console.error(error.message)
		}
	}

	const CancelListing = async () => {
		try {
		
			if (window.ethereum) {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				  });
				  const address = accounts[0];
				  let provider = new ethers.providers.Web3Provider(window.ethereum);
				let signer = provider.getSigner();
				const ERC721 = new ethers.Contract(
					ERC721ContractAddress,
					ERC721ABI,
					signer,
					{ gas: 2100000, gasPrice: 800000000 }
				);
				let tx= await ERC721.CancelListings(quantity,pricePerToken)
				ERC721.on("ListToken", (quantity) => {
					console.log(`quantity: ${quantity} ,pricePerToken:${pricePerToken}`)
				})
				} 
			else {
				console.alert("Please Install MetaMask Extension")
				}
			}
			catch (error) {
				console.error(error.message)
			}
	}



  return (
    <>
        <div className="ListingCards">
          <img src={Bed} alt="" />
          <h2> {property.propertyName}</h2>
          <h3>Bed: {property.beds}</h3>
          <h3>Bath: {property.baths}</h3>
          <Link to={`/propertydetails/${property._id}`} className='view'>View Property</Link>
        </div>
    </>
  )
}

export default ListingCard