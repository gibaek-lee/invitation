const keyColor = '#a9a9a9'
const isMobile = validIsMobile()
const NUM_MORE_IMG = 4
const INFO_AACOUNTS = [
  '계좌번호',
  '카카오뱅크 3333-10-0168181 이기백',
  '신한은행 110-154-512579 백미하'
]

appendListMorImgs()
addAccountInfo()

document.querySelectorAll('section.images > ul > li').forEach(element => {
  element.addEventListener('click', (event) => {
    const { target } = event

    if(target.style.position === 'fixed') {
      document.body.setAttribute('style', 'overflow: auto;')

      target.setAttribute('style', '')
      if(target.parentElement) {
        target.parentElement.removeChild(target.parentElement.lastChild)
      }
    } else {
      document.body.setAttribute('style', 'overflow: hidden;')

      const style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height: '100vh',
        'z-index': 100,
        'box-shadow': `0px 0px 30px ${keyColor}`
      }
      target.setAttribute(
        'style',
        Object.keys(style).reduce((accum, key) => accum += `${key}: ${style[key]}; `, '')
      )

      appendDim(target)
    }
  })
})

function appendDim (targetImgElement) {
  const dim = document.createElement( 'div' )
  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    'background-color': keyColor,
    'z-index': 1,
    opacity: 0.8
  }
  dim.setAttribute(
    'style',
    Object.keys(style).reduce((accum, key) => accum += `${key}: ${style[key]}; `, '')
  )

  targetImgElement.parentElement.appendChild(dim)

  const callbackRemoveDim = () => {
    targetImgElement.setAttribute('style', '')
    targetImgElement.parentElement.removeChild(dim)

    dim.removeEventListener('click', callbackRemoveDim)
  }

  dim.addEventListener('click', callbackRemoveDim)
}

function validIsMobile(){
	const UserAgent = navigator.userAgent

  return UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
      || UserAgent.match(/LG|SAMSUNG|Samsung/) != null
}

function appendListMorImgs () {
  const targetParent = document.querySelector('#more-imgs')
  for(let i = 0; i < NUM_MORE_IMG; i++) {
    const liNode = document.createElement('li')
    const imgNode = document.createElement('img')
    imgNode.setAttribute('src', `assets/more/${i + 1}.jpg`)
    liNode.appendChild(imgNode)
    targetParent.appendChild(liNode)
  }
}

function addAccountInfo () {
  const accountSectionNode = document.querySelector('.account')
  INFO_AACOUNTS.forEach(data => {
    const pNode = document.createElement('p')
    pNode.innerText = data
    accountSectionNode.appendChild(pNode)
  })
}
