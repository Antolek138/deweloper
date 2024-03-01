document.addEventListener('DOMContentLoaded', () => {
	const logo = document.querySelector('.nav__logo')
	const menu = document.querySelector('.nav__menu')
	const bars = document.querySelector('.nav__bars')
	const allNavItems = document.querySelectorAll('.nav__menu-link')

	const section = document.querySelector('.kinghouse__number--one')
	const countItems = document.querySelectorAll('.kinghouse__num')

	const body = document.querySelector('body')

	const options = {
		rootMargin: `0.5%`,
	}

	const opinionOneBtn = document.querySelector('.references__btn--one')
	const opinionTwoBtn = document.querySelector('.references__btn--two')
	const opinionThreeBtn = document.querySelector('.references__btn--three')
	const opinionContainer = document.querySelector('.references__container')
	const opinionCards = document.querySelectorAll('.references__card')
	const totalCards = opinionCards.length
	const opinionWidth = opinionCards[1].clientWidth
	let startIndex = 0

	const showMenu = () => {
		menu.classList.toggle('nav__menu--active')
		bars.classList.toggle('nav__bars--active')
		blockBody()

		allNavItems.forEach(item =>
			item.addEventListener('click', () => {
				menu.classList.remove('nav__menu--active')
				bars.classList.remove('nav__bars--active')
			})
		)
	}

	const navBackground = () => {
		const nav = document.querySelector('.nav')
		const mobileWidth = window.innerWidth
		const tabletWidth = window.innerWidth
		const desktopWidth = window.innerWidth

		if (mobileWidth < 768 && window.scrollY >= 80) {
			nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
		} else if (desktopWidth > 992 && window.scrollY >= 120) {
			nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
		} else if (tabletWidth === 768 && window.scrollY >= 100) {
			nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
		} else {
			nav.style.backgroundColor = 'transparent'
		}
	}

	const randomUser = async () => {
		const URL = 'https://randomuser.me/api/'
		let photos = document.querySelectorAll('.references__photo')
		let peopleNames = document.querySelectorAll('.references__name')

		try {
			await axios.get(URL).then(res => {
				const firstName = res.data.results[0].name.first
				const LastName = res.data.results[0].name.last
				const poplePhoto = res.data.results[0].picture.medium

				photos.forEach(photo => {
					photo.setAttribute('src', poplePhoto)
				})

				peopleNames.forEach(name => {
					name.textContent = `${firstName}  ${LastName}`
				})
			})
		} catch (error) {
			console.error('Błąd podczas pobierania danych: ', error.message)
		}
	}

	const opinionSlider = index => {
		startIndex = (index + totalCards) % totalCards

		const displacement = -startIndex * opinionWidth
		opinionContainer.style.transform = `translateX(${displacement}px)`

		opinionCards.forEach((card, i) => {
			if (i === startIndex) {
				card.classList.add('references__card--active')
			} else {
				card.classList.remove('references__card--active')
			}
		})
	}

	const footerYear = () => {
		const yearFooter = document.querySelector('.footer__year')

		const date = new Date()
		const year = date.getFullYear()

		yearFooter.textContent = year
	}

	const numberAnimation = entry => {
		if (entry[0].isIntersecting) {
			countItems.forEach(item => {
				const interval = 3000
				let startValue = 0
				let endValue = parseInt(item.getAttribute('data-num'))
				let duration = Math.floor(interval / endValue)
				let counter = setInterval(() => {
					startValue += 1
					item.textContent = startValue
					if (startValue == endValue) {
						clearInterval(counter)
					}
				}, duration)
			})
			observer.unobserve(section)
		}
	}

	const blockBody = () => {
		if (body.classList.contains('unlocked')) {
			body.classList.remove('unlocked')
			body.classList.add('blocked')
		} else {
			body.classList.remove('blocked')
			body.classList.add('unlocked')
		}
	}

	const logoClose = () => {
		menu.classList.remove('nav__menu--active')
		bars.classList.remove('nav__bars--active')
		body.classList.remove('blocked')
		body.classList.add('unlocked')
	}

	footerYear()
	randomUser()

	const observer = new IntersectionObserver(numberAnimation, options)
	observer.observe(section)

	opinionOneBtn.addEventListener('click', () => {
		opinionSlider(0)
	})
	opinionTwoBtn.addEventListener('click', () => {
		opinionSlider(1)
	})
	opinionThreeBtn.addEventListener('click', () => {
		opinionSlider(2)
	})
	logo.addEventListener('click', logoClose)
	document.addEventListener('scroll', navBackground)
	bars.addEventListener('click', showMenu)
})
