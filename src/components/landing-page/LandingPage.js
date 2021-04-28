import React from 'react';

class LandingPage extends React.Component {
	render() {
		return (
			<div className='landing-page'>
				<header className='main'>
					<h1>Reflect</h1>
					<h2>find inner peace</h2>
					{/* <img src='/Users/taylorkeazirian/Desktop/Thinkful/reflect-app/reflect-app/public/images/zoltan-tasi-vHnVtLK8rCc-unsplash.jpg' alt='Lotus Flower' />
					<span>
						Photo by{' '}
						<a href='https://unsplash.com/@zoltantasi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
							Zoltan Tasi
						</a>{' '}
						on{' '}
						<a href='https://unsplash.com/s/photos/meditation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
							Unsplash
						</a>
					</span> */}
				</header>
				<section className='why'>
					<h3>Why Reflect?</h3>
					<div className='intro'>
						<p>
							By now, you have most likely heard of meditation. Maybe you've
							even tried it! According to
							<a href='https://www.mindful.org/how-to-meditate-3/' className='meditate-link'> this article
							</a> from <a href='https://www.mindful.org/' className='meditate-link'>mindful.org</a>, "When we
							meditate, we inject far-reaching and long-lasting benefits into
							our lives: We lower our stress levels, we get to know our pain, we
							connect better, we improve our focus, and we are kinder to
							ourselves." Despite knowing the positive benefits, meditation can
							be overwhelming. It can be difficult to start a meditation
							practice, and even harder to maintain one.
							<strong> Reflect</strong> is here to help!
						</p>
					</div>
				</section>
				<section className='what'>
					<div className='mid'>
						<h3>How does it work?</h3>
						<p>
							With Reflect, you meditate for 5 minutes. That's it! During that time, you will
							start to feel your body relax, your thoughts begin to quiet, and
							your heart begin to calm. Rather than a formal meditation, Reflect
							allows you to re-center and stay present within yourself. Many
							know this as a Mindfulness Meditation practice. The best part is -
							there's no right or wrong way to do it!
						</p>
						<p>
							After your meditation, you will reflect on how you feel and
							jot down any notes or observations. You'll notice with each
							session, your confidence will grow.
						</p>
						<p>
							You can choose to use Reflect during any part of your day - when
							you wake up, in between work meetings, or even to help you fall
							asleep.
						</p>
					</div>
				</section>
				<section className='signup'>
					<div className='signup'>
						<h3>Sign up</h3>
						<p>
							When you sign up for a Reflect account, you can track your
							meditation practice. You will see how many minutes you have
							meditated, as well as your "reflections" about each
							session. You may find yourself coming back to Reflect more and
							more as you notice internal peace and calm. You have it within you
							to sit and be with your stillness.
						</p>
						<p>Reflect allows you to harness that power.</p>
						<p>Click [dashboard] above to try it out!</p>
					</div>
				</section>
			</div>
		);
	}
}

export default LandingPage;
