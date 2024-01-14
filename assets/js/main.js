const plusIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>';
const minusIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>';

function hideSections() {
	const sections = document.querySelectorAll( ".gfield--type-accordion .m_section" );
	sections.forEach( ( section, i ) => {
		if ( ! section.classList.contains( "hidden" ) ) {
			section.classList.add( "hidden" );
		}
	} );
}

function wrapSections() {
	const liElements = document.querySelectorAll( ".gfield" );
	let wrapperDiv = null;

	liElements.forEach( ( li, i ) => {
		if ( li.classList.contains( "gfield--type-accordion" ) ) {
			const button = document.createElement( "button" );
			button.classList.add( `toggle-section` );
			button.dataset.target = `section-${ i }`;
			button.innerHTML = plusIcon;
			li.querySelector( ".gsection_title" ).appendChild( button );
			li.classList.add( "section-title" );
			wrapperDiv = document.createElement( "div" );
			wrapperDiv.classList.add( "m_section" );
			wrapperDiv.setAttribute("id", `section-wrapper-${ i }`);
			wrapperDiv.dataset.section = `section-${ i }`;
			li.querySelector( ".gsection_title" ).insertAdjacentElement(
				"afterend",
				wrapperDiv
			);
		} else if ( wrapperDiv ) {
			wrapperDiv.appendChild( li );
		}
	} );
	if ( wrapperDiv ) {
		const ulElement = document.querySelector( ".gform_fields" );
		ulElement.appendChild( wrapperDiv );
	}
}

document.addEventListener( "DOMContentLoaded", function () {
	document.querySelector( "select" ).addEventListener( "change", function () {
		if ( document.querySelectorAll( ".m_section" ) ) {
			document.querySelectorAll( ".m_section" ).forEach( ( section ) => {
				if ( ! section.classList.contains( "hidden" ) ) {
					section.classList.add( "hidden" );
				}
			} );
		}
	} );

	if ( document.querySelector( ".gfield" ) ) {
		wrapSections();
		hideSections();
		const toggleSection = document.querySelectorAll( ".toggle-section" );
		toggleSection.forEach( ( button ) => {
			button.addEventListener( "click", function ( e ) {
				toggleSection.forEach( ( button ) => {
					button.innerHTML = plusIcon;
				} );
				e.preventDefault();
				document
				.querySelectorAll( ".gfield--type-accordion .m_section" )
				.forEach( ( section ) => {
					if (
						! section.classList.contains( "hidden" ) &&
						section !== this.parentNode.nextElementSibling
						) {
						section.classList.add( "hidden" );
				}
			} );
				const section = document.querySelector(
					`[data-section="${ this.dataset.target }"]`
					);
				section.classList.toggle( "hidden" );
				this.scrollIntoView( { block: "start", behavior: "smooth" } );

				if ( section.classList.contains( "hidden" ) ) {
					this.innerHTML = plusIcon;
				} else {
					this.innerHTML = minusIcon;
				}
			} );
		} );
	}
} );