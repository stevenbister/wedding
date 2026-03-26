import { venue } from './venue';

export const content = {
	noKids: 'We can’t wait to celebrate with you all. Adults only, please.',
	saveTheDate: {
		title: 'Save the date',
		ctaSection: {
			heading: 'Steve & Grace',
			description: 'Invite you to celebrate their wedding at',
			cta: 'Save the date'
		}
	},
	rsvp: {
		title: 'Steve & Grace Get Married!',
		formResponse: {
			rsvp_true:
				'We can’t wait to share our day with you. If anything changes and you can’t make it; just come back here and change your response or just let Steve and Grace know.',
			rsvp_false:
				'Sorry we can’t share our day with you. If anything changes and you can make it; just come back here and change your response or just let Steve and Grace know.'
		},
		contact: 'If you have any trouble RSVP-ing please contact either Steve or Grace'
	},
	info: {
		title: 'Info',
		sections: [
			{
				title: 'The details',
				icon: 'checklist',
				info: [
					{
						title: 'Where is the wedding?',
						content: `<p>The wedding ceremony and reception will be held at:<br><strong>${venue.address}</strong></p><p>For more info see our <a href="/venue">venue page.</a></p>`
					},
					{
						title: 'What time should I arrive?',
						content:
							'Please arrive between 11.30 and 12, ready to take your seats at around 12.20. The bar will be open an hour before the ceremony, if you wish to buy a drink, and there’s plenty of seats around the venue before making your way into the ceremony room.'
					},
					{
						title: 'What’s the timelines of the day?',
						content:
							'We ask that guests arrive between 11.30am-12pm, and take your seats at 12.20, ready for the ceremony to start at 12.30pm. We’ll follow this with cocktail hour, the wedding breakfast, and then party time. The dj will stop spinning and the bar will stop serving at 12am. We’ll then ask you to start making your way home by 12.30/1am.'
					},
					{
						title: 'How and when to RSVP?',
						content:
							'<p>You can RSVP online here ____  or by emailing <a href="mailto:steveandgracegetmarried@gmail.com">steveandgracegetmarried@gmail.com</a></p><p>Please RSVP by _____</p>'
					},
					{
						title: 'What’s the dress code / Should I bring anything?',
						content:
							'<p>We’d suggest cocktail / semi-formal attire - think suits and ties, cocktail and midi/knee length dresses. Most importantly, please wear shoes you can dance in!</p><p>We’d also recommend you’ve applied some sunscreen, taken some antihistamines, and bring some sunnies (we can hope!).</p>'
					},
					{
						title: 'Will the wedding be indoors or outdoors?',
						content:
							'The ceremony will be held indoors, but we’ll be heading outside for drinks and photos so make sure you’ve applied some sunscreen, taken some antihistamines, and bring some sunnies (we can hope!).'
					},
					{
						title: 'Will it be an unplugged ceremony / Can I take photos?',
						content:
							'For the ceremony itself we’d love if you could please keep your phones in your pockets. I promise our photographer has it covered. Post ceremony - snap to your hearts content!'
					}
				]
			},
			{
				title: 'Transport, Parking and Accomodation',
				icon: 'car',
				info: [
					{
						title: 'Will there be parking?',
						content:
							'<p>There is onsite parking at the venue, and the above hotels.</p><p>We need to add in something about picking up vehicles the next morning if you’re staying etc.</p><p><strong>Please note - you’ll need to collect your car from the venue by 11am, and cars are left at your own risk as gates to our car parks are not locked.</strong></p>'
					},
					{
						title: 'Can I charge my car at the venue?',
						content:
							'Unfortunately, the venue doesn’t have electric car charging points. But there are some nearby at the "Heart of England"  (5 minutes away from Dodmoor) or "Oval services J16" (7 minutes away from Dodmoor).'
					},
					{
						title: 'What are my accommodation options?',
						content:
							'<p>Dodmoor House has excellent links with two local hotels <a href="https://all.accor.com/hotel/A0I0/index.en.shtml?merchantid=ppc-ach-gen-goo-uk-en-pmax-novotel&sourceid=aw-cen&utm_source=google&utm_medium=cpc&merchantid=ppc-ach-gen-goo-uk-en-pmax&sourceid=aw-censear-aaw-cen&utm_source=google&utm_medium=cpc&utm_campaign=ppc-ach-gen-goo-uk-en-reg_top-pmax-s&utm_term=gen&utm_content=uk-en-all-all&gad_source=1&gad_campaignid=22978831628&gbraid=0AAAAADo0MF9TcDUYW8JlscrxqEwrIkNQq&gclid=Cj0KCQjwo63HBhCKARIsAHOHV_W1ZCT1Ad_t6zf1gGpyWYGauQLjZRteZQ7VdDCXc75dXx179nLWQrsaAp4OEALw_wcB" target="_blank" rel="noreferrer noopener">The Mercure, Daventry Court Hotel</a> and the <a href="https://www.stavertonpark.co.uk/" target="_blank" rel="noreferrer noopener">Staverton Park Hotel</a>. The room includes bed & breakfast, and group transport provided by us at the end of the night (so you would need to book your own taxi if you wanted to leave any earlier).</p><p>We will provide a code you must use in order to be included within the transport.</p><p><strong>Please note that allocations run out six weeks before the wedding day and rooms must be booked using your specific allocation code to be included in the transport.</strong></p><p><strong>Also, if you do not book using the below instructions you will have to make your own transport arrangements on the evening.</strong></p>'
					}
				]
			},
			{
				title: 'Who’s coming?',
				icon: 'groomsmen',
				info: [
					{
						title: 'Can I bring a plus 1?',
						content:
							'We’re keeping this an intimate affair, if their name isn’t on the invite please leave them at home.'
					},
					{
						title: 'Are kids invited?',
						content: 'Whilst we love the little ones, we’re having an adults only celebration.'
					}
				]
			},
			{
				title: 'Food and drink',
				icon: 'cheers',
				info: [
					{
						title: 'What’s on the menu?',
						content: 'The most important question - and we hope to keep you well fed throughout.'
					},
					{
						title: 'What if I have dietary requirements?',
						content:
							'Please indicate on your RSVP if you have any dietary requirements so that we can arrange alternatives with our caterers. We want you to be comfortable and well fed.'
					},
					{
						title: 'What’s the situation with the bar?',
						content:
							'<p>As much as we’d love to offer an open bar, our wallets don’t stretch quite that far.</p><p>But we’re covering the drinks offered at the drinks reception, and during the wedding breakfast. After this point, or if you fancy something different to what we have to offer there will be a fully stocked licensed bar on the venue. Card payments are preferred.</p>'
					}
				]
			},
			{
				title: 'Gifting',
				icon: 'gift',
				info: [
					{
						title: 'Is there a gift list?',
						content:
							'We are so excited to have you join our special day, and your presence is the best gift we could ask for. If you would, however, like to honour us with a gift, we’d greatly appreciate a contribution towards our honeymoon fund.'
					}
				]
			},
			{
				title: 'Anything else',
				icon: 'suit-and-dress',
				info: [
					{
						title: 'Who should I contact with any additional questions?',
						content:
							'<p>Prior to the day you can contact us on either of our phone numbers or on the following <a href="mailto:steveandgracegetmarried@gmail.com">steveandgracegetmarried@gmail.com</a></p><p>Wifi and signal is a bit spotty at the venue, and we’d really like to spend the morning relaxing and getting ready. So please get all the info you need prior to the day.</p>'
					},
					{
						title: 'Accessibility',
						content:
							'Dodmoor House is very accessible, with slopes in the courtyard and ramps available if needed. Our bar is located upstairs and as we are Grade 2 listed we do not have a lift, we will however offer waitress service to guests throughout the day and evening. We can also reserve you a parking space close to the venue, please get in touch to reserve a spot. We do also have an accessible toilet and baby changing facilities.'
					},
					{ title: 'Confetti', content: '' }
				]
			}
		]
	},
	schedule: {
		title: 'Schedule'
	},
	venue: {
		title: 'Venue',
		callout:
			"Please note that some Sat Nav's do not recognise Weedon Lane so please do look at the below directions, or search for the venue on google maps rather than the address.",
		sections: [
			{
				title: 'Can I park/charge my car at the venue?',
				description:
					'Check out our <a href="/info#transport-parking-and-accomodation-section">info page</a> for details on parking/charging.'
			},
			{
				title: 'How to get there by car',
				description: null,
				directions: [
					{
						title: 'From the M1 North',
						content:
							'<p>Turn off the M1 at junction 18 and follow signs to the A5 towards Milton Keynes.</p><p>Continue for several miles on the A5 until you pass the Heart of the Shires shopping village on your left (just past a turning to Norton on your right).</p> <p>After approx 0.7 miles, you will see a sign to Dodford.</p> <p>Ignore this. After a further 0.6 miles, you will see a second sign to Dodford. Turn right.</p> <p>Go over the canal bridge and Dodmoor House is immediately on the right-hand side.</p>'
					},
					{
						title: 'From the M1 South',
						content:
							'<p>Exit the M1 at J16 and take the first left towards Daventry. You will quickly arrive at a second roundabout, take the 2nd exit towards Daventry (if you are going to the Holiday Inn first please take the first exit for Flore/Hotel).</p> <p>When you reach the next roundabout on the A5 take the 3rd exit towards Hinckley. Then take the next immediate left signed for Dodford. Dodmoor House is then directly on the right just after the little bridge</p>'
					},
					{
						title: 'From the A45 (Daventry (west) or Northampton (east)',
						content:
							'<p>(from the east) - follow the A45 from Northampton, cross over the M1 at j16. You will quickly arrive at a second roundabout, take the 2nd exit towards Daventry (if you are going to the Holiday Inn first please take the first exit for Flore/Hotel).</p> <p>When you reach the next roundabout on the A5, take the 3rd exit towards Hinckley.</p> <p>(Both)</p> <p>After joining the A5, take the first turning left to Dodford (with a large weight restriction sign). Go over the canal bridge and Dodmoor House is immediately on the right-hand side.</p>'
					},
					{
						title: 'From the M40',
						content:
							'<p>Take the exit at junction 10 of the M40 and follow the A43 towards Northampton and Towcester</p> <p>When you arrive at Towcester (with a VW garage on the roundabout), take the second exit (left) signposted towards the A5 – Hinckley or Weedon (nb: you do not go into Towcester)</p> <p>Follow the A5 for about 10 minutes until you reach the crossroads where the A45 crosses over the A5 at Weedon.</p> <p>Go straight over the roundabout and then take the first turning left to Dodford (with a large weight restriction sign). Go over the canal bridge and Dodmoor House is immediately on the right-hand side.</p>'
					}
				]
			},
			{
				title: 'How to get there by train / plane?',
				description:
					'Driving is the most direct route, as it’s a little in the sticks. But If you’re not driving, the nearest train stations are Long Buckby and Northampton and the nearest airports are Birmingham International and London Luton.',
				directions: null
			}
		]
	},
	social: 'Steve & Grace invite you to celebrate their wedding'
};
