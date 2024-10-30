import {Audio} from 'remotion'
import {Img} from 'remotion'
import React from 'react';
import AnimationEffect from '../video_components/AnimationEffect';
import { Story } from '../video_components/Story';
import { AbsoluteFill, staticFile } from 'remotion';
import { Company } from '../parts/Company';
import { CustomerGroup } from '../parts/CustomerGroup';
import { MoneyArrow } from '../parts/MoneyArrow';
import { ValueArrow } from '../parts/ValueArrow';
import { Subtitles } from '../video_components/Subtitles';
import { Markdown } from '../video_components/Markdown';
import EdgeWaver from '../video_components/EdgeWaver';
import { ProductPart } from '../parts/ProductPart';
import { ThreeAnimationEffect } from '../video_components/ThreeAnimationEffect';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { GLTFNode } from '../video_components/GLTFNode';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Anchor } from '../video_components/Anchor';
import { AnimatedGlb } from '../video_components/AnimatedGlb';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';
import { productDeveloperSubtitles } from '../productDeveloperSubtitles';

const titleText = {
	en: `
# Product Developers:

### Who are they and why are they on the rise?`,
	zhCN: `
# 产品开发者：

### 他们是谁？为什么他们的崛起如此重要？`,
	zhTW: `
# 產品開發发者：

### 他們是誰？為什麼他們的崛起如此重要？`,
	ja: `
# 製品の開発者（Product Developers）：

### とは。彼らは何者で、なぜ台頭してきているのか。`,
}

const textDonorExplainer = {
	en: `## Requirement Donor

Anyone who has successfully convinced the Product Owner to invest in their product *hypothesis*.
							`,
	zhCN: `## 需求捐赠者(Requirement Donor)

任何成功说服产品负责人投资于他们的产品*假设*的人。
							`,
	zhTW: `## 需求捐贈者(Requirement Donor)

任何成功說服產品負責人投資於他們的產品*假設*的人。
							`,
	ja: `## 要求ドナー

製品所有者を説得して、彼らの製品*仮説*に投資することに成功した人は誰でも。
							`,
}

const textConclusion = {
	en: `## Conclusion

* Who are the Product Developers:
  * Adopt a customer-centric approach.
  * Focus on whole product, not isolated parts.
  * Are guided by a Product Owner but collaborate directly with 'requirement donors'
	* Implement and validate the value of product hypotheses.
* Why are they on the rise?
	*	Businesses are shifting to product-building strategies.
							`,
	zhCN: `## 结论

* 产品开发者是谁：
	* 以客户为中心。
	* 关注整个产品，而不是孤立的部分。
	* 由产品负责人指出方向，但直接与“需求捐赠者”合作。
	* 实现和验证产品假设的价值。
* 为什么他们要崛起？
	* 企业正在转向以构建产品来引领发展的策略。
							`,

	zhTW: `## 結論

* 產品開發者是誰：
	* 以客戶為中心。
	* 關注整個產品，而不是孤立的部分。
	* 由產品負責人指出方向，但直接與“需求捐贈者”合作。
	* 實現和驗證產品假設的價值。
* 為什麼他們要崛起？
	* 企業正在轉向以構建產品來引領發展的策略。
							`,
	ja: `## 結論

* 製品の開発者（Product Developers）は誰ですか：
	* 顧客中心のアプローチを採用します。
	* 部分的な製品ではなく、製品全体に焦点を当てます。
	* 製品オーナーによって導かれますが、「要求ドナー」と直接協力します。
	* 製品仮説の価値を実装して検証します。
* なぜ彼らは台頭しているのか？
	* 企業は、製品構築戦略にシフトしています。
							`,

}

const url = staticFile('assets/shape_sorting_box/scene.gltf')
useLoader.preload(GLTFLoader, url);
const urlPot = staticFile('assets/quillustration_flower_and_water-can/scene.gltf')
useLoader.preload(GLTFLoader, urlPot);

export const StoryProductDeveloper: React.FC = () => {
  return (
		<Story id="StoryProductDeveloper" subtitles={productDeveloperSubtitles} width={720} language="ja">
		  <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
			<Audio src={staticFile("assets/audios/product_developer.mp3")} />
			<AbsoluteFill style={{ backgroundColor: 'beige', fontFamily: "Poppins", transformStyle: "preserve-3d" }}>
				<AnimationEffect actor="stage">
					<Company style={{position: 'absolute', left: '0%', top:'15%', width: '50%', height: "60%"}}/>
					<Anchor actor="company service" style={{left: "50%", top: "44%"}}/>
					<Anchor actor="company receiver" style={{left: "50%", top: "60%"}}/>
					<AbsoluteFill style={{width: "150%", left: "-50%"}}>
					<ThreeDFrame debug={false}>
						<directionalLight
							castShadow
							position={[10, 20, 15]}
							intensity={15}
							color={0xffffff}
						/>	
						<ThreeAnimationEffect actor="product">
							<ProductPart />
						</ThreeAnimationEffect>

						<ThreeAnimationEffect actor="hex" scale={0.1} rotation={[0.4, 0, 0.0]} position={[-2.5,0,0]}>
							<GLTFNode recenter url={url} nodeName="g_hex"/>
						</ThreeAnimationEffect>

						<ThreeAnimationEffect actor="cylinder" scale={0.1} rotation={[0.0, 0.2, 0.0]} position={[-1.0,2.5,0]}>
							<GLTFNode recenter url={url} nodeName="g_circle"/>
						</ThreeAnimationEffect>

						<ThreeAnimationEffect actor="pot" scale={2.0} rotation={[0.0, 0, 0.0]} position={[1.8,-0.1,1.8]}>
							<AnimatedGlb url={urlPot} actor="watering" />
						</ThreeAnimationEffect>
					</ThreeDFrame>
					</AbsoluteFill>

					<CustomerGroup style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
					<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
						<AnimationEffect actor="value to customer">
							<ValueArrow />
						</AnimationEffect>
					</div>
					<div >
						<AnimationEffect actor="value from customer" style={{position: 'absolute', left: '47%', top: '45%', width: '37%', height: '37%'}}>
							<MoneyArrow />
						</AnimationEffect>
					</div>
					<Anchor actor="pd team1" style={{left: "20%", top: "28%"}}/>
					<Anchor actor="pd team2" style={{left: "20%", top: "63%"}}/>
					<Anchor actor="user" style={{left: "70%", top: "45%"}}/>
					<Anchor actor="customer" style={{left: "86%", top: "50%"}}/>

					<AnimationEffect actor="calendars" style={{left: "-40%", top: "15%", width: "30%"}}>
						<AnimationEffect actor="month1" style={{position: "initial", display: "inline"}}>
							<Img src={staticFile("assets/calendar.svg")} width="80px" />
						</AnimationEffect>
						<AnimationEffect actor="month2" style={{position: "initial", display: "inline"}}>
							<Img src={staticFile("assets/calendar.svg")} width="80px" />
						</AnimationEffect>
						<AnimationEffect actor="month3" style={{position: "initial", display: "inline"}}>
							<Img src={staticFile("assets/calendar.svg")} width="80px" />
						</AnimationEffect>
						<AnimationEffect actor="month4" style={{position: "initial", display: "inline"}}>
							<Img src={staticFile("assets/calendar-deliver.svg")} width="80px" />
						</AnimationEffect>
					</AnimationEffect>
					<AnimationEffect actor="external developers" style={{left: "-40%", top: "65%"}}>
						<AnimationEffect actor="manager1" style={{width: "5%", top: "0", left: "0%"}}>
							<Img src={staticFile("assets/less/manager.svg")} width="100%" />
						</AnimationEffect>
						<AnimationEffect actor="developers1" style={{width: "15%", top: "3%", left: "8%"}}>
							<Img src={staticFile("assets/less/team_of_three.svg")}  width="100%"/>
						</AnimationEffect>
					</AnimationEffect>

				  <AnimationEffect actor="product owner" style={{left: "40%", top: "25%", width: "80%"}}>
						<AbsoluteFill style={{width: "8%", top: "0", left: "0%"}}>
							<Img src={staticFile("assets/less/po.svg")} />
						</AbsoluteFill>
					</AnimationEffect>
					<AnimationEffect actor="internal developers" style={{left: "3%", top: "25%", width: "80%"}}>
						<AnimationEffect actor="manager2" style={{width: "5%", top: "0", left: "0%"}}>
							<Img src={staticFile("assets/less/manager.svg")} width="100%"/>
						</AnimationEffect>
						<AnimationEffect actor="developers2" style={{width: "15%", top: "3%", left: "8%"}}>
							<Img src={staticFile("assets/less/team_of_three.svg")} width="100%" />
						</AnimationEffect>
					</AnimationEffect>

				  <AnimationEffect actor="mask" style={{backgroundColor: "rgba(240, 235, 210, 0.9)"}}/>

					<AnimationEffect actor="title">
					<AnimationEffect actor="product developer1" style={{left: "30%", height: "30%", top: "15%", width: "30%", transformStyle: "preserve-3d" }}>
						<Img src={staticFile("assets/product_developer.svg")} width="100%" style={{opacity: 0.2}}/>
					</AnimationEffect>
					<AnimationEffect actor="product developer2" style={{left: "35%", height: "30%", top: "12%", width: "30%", transformStyle: "preserve-3d" }}>
						<Img src={staticFile("assets/product_developer.svg")} width="100%" style={{opacity: 0.6}}/>
					</AnimationEffect>
					<AnimationEffect actor="product developer3" style={{left: "40%", height: "30%", top: "9%", width: "30%", transformStyle: "preserve-3d" }}>
						<Img src={staticFile("assets/product_developer.svg")} width="100%" style={{opacity: 1}}/>
					</AnimationEffect>
					<AbsoluteFill style={{ left: '0%', top: '40%', width: '100%', height: '65%' }} >
						<EdgeWaver actor="title-shadow" amplitudePercentageOfHeight={6} frequency={1.2} style={{ backgroundColor: 'rgba(253, 250, 88, 0.8)' }}  />
						<EdgeWaver actor="title" amplitudePercentageOfHeight={6} frequency={1.2} style={{backgroundColor: 'rgba(0, 114, 160, 0.8)' }}  >
							<Markdown actor="" style={{ paddingTop: '50px', paddingLeft: '10px', fontSize: "x-large"}}
								md={titleText}
							/>
						</EdgeWaver>
						<AbsoluteFill style={{ left: '2%', top: '71%', width: '10%', height: '20%'}}>
							<Img src={staticFile('assets/less/less-logo.svg')} style={{ width: "100%" }}/>
						</AbsoluteFill>
						<AbsoluteFill style={{ left: '13%', top: '68%', width: '7%', height: '20%'}}>
							<Img src={staticFile('assets/SA_badge_csd.png')} style={{ width: "100%" }}/>
						</AbsoluteFill>
						<AbsoluteFill style={{ left: '23%', top: '68%', width: '7%', height: '20%'}}>
							<Img src={staticFile('assets/SA_badge_a_csd.png')} style={{ width: "100%" }}/>
						</AbsoluteFill>
						<AbsoluteFill style={{ left: '31%', top: '68%', width: '70%', height: '20%'}}>
							<span style={{fontSize: '20px'}}>LeSS in Action course (八月21 - 25)</span>
						</AbsoluteFill>
						<AbsoluteFill style={{ left: '47%', top: '74%', width: '70%', height: '20%'}}>
							<span style={{fontSize: '20px'}}>TOKYO</span>
						</AbsoluteFill>
						<AbsoluteFill style={{ left: '80%', top: '71%', width: '70%', height: '20%'}}>
							<span style={{fontSize: '18px'}}>By terry@</span>
						</AbsoluteFill>
						<AbsoluteFill style={{ left: '89%', top: '65%', width: '12%', height: '20%'}}>
							<OddeLogo />
							<FlipCoin speed={2} interval={4} shift={0} >
								<OddeLogoInner />
							</FlipCoin>
						</AbsoluteFill>
					</AbsoluteFill>
					</AnimationEffect>

				</AnimationEffect>

					<Markdown actor="donor explainer" style={{ backgroundColor:"indigo", width: "80%", left:"10%", top: "25%", height:"45%", paddingTop: '', padding: '20px', fontSize: "x-large", borderRadius: "10px"}}
					md={textDonorExplainer}
				/>

					<Markdown actor="conclusion" style={{ backgroundColor:"indigo", width: "90%", left:"5%", top: "10%", height:"80%", paddingTop: '', padding: '20px', fontSize: "x-large", borderRadius: "10px"}}
					md={textConclusion}
				/>


				<AnimationEffect actor="donor cap" style={{left: "50%", height: "30%", top: "2%", width: "30%", transformStyle: "preserve-3d" }}>
					<Anchor actor="donor edge" style={{left: "20%", top: "50%"}}/>
					<Img src={staticFile("assets/cap.svg")} width="100%" />
				</AnimationEffect>
				<AnimationEffect actor="aha" style={{left: "70%", height: "30%", top: "55%", width: "28%", transformStyle: "preserve-3d" }}>
					<Img src={staticFile("assets/aha.jpeg")} width="100%" style={{ clipPath: "circle()"}}/>
				</AnimationEffect>
				<AnimationEffect actor="gift product" style={{left: "10%", height: "20%", top: "28%", width: "20%", transformStyle: "preserve-3d" }}>
					<Img src={staticFile("assets/gift_product.svg")} width="100%" />
				</AnimationEffect>



				<Subtitles scale={0.6} />
			</AbsoluteFill>

    </Story>
  );
};