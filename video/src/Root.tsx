import { StoryProductDeveloper } from './stories/StoryProductDeveloper';
import { StoryFailureVsFailure } from './stories/StoryFailureVsFailure';
import { StoryBooleanParameters } from './stories/StoryBooleanParameters';
import { StoryBooleanReturns } from './stories/StoryBooleanReturns';
import { StoryLeSSComplete } from './stories/StoryLeSSComplete';
import { StoryScalingScrum } from './stories/StoryScalingScrum';
import { StoryWhyWhyLeSS } from './stories/StoryWhyWhyLeSS';
import { StoryTransparent } from './stories/StoryTransparent';
import { StoryGameOfLife } from './stories/StoryGameOfLife';
import { StoryBooleanData } from './stories/StoryBooleanData';
import { StoryInterationSprint } from './stories/StoryIternationSprint';
import { StorySimpleExample } from './stories/StorySimpleExample';
import { StoryLeSSInAction } from './stories/StoryLeSSInAction';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<StorySimpleExample />
			<StoryFailureVsFailure />
			<StoryBooleanParameters />
			<StoryBooleanData />
			<StoryBooleanReturns />
			<StoryLeSSComplete />
			<StoryScalingScrum />
			<StoryInterationSprint />
			<StoryWhyWhyLeSS />
			<StoryProductDeveloper />
			<StoryTransparent />
			<StoryGameOfLife />
			<StoryLeSSInAction />
		</>
	);
};

