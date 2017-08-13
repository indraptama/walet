import anime from 'animejs'

// Animation InputBorder
export const focusLine = (elem, elem2) => {
  anime({
    targets: elem,
    translateX: {
      value: '100%',
      elasticity: 250,
    },
    easing: [0, 0, .2, 1],
    duration: 500,
  });
  anime({
    targets: elem2,
    color: '#ff00cc',
    easing: [0, 0, .2, 1],
    duration: 500,
  });
}

export const outFocusLine = (elem, elem2) => {
  anime({
    targets: elem,
    translateX: {
      value: '0%',
      elasticity: 250,
    },
    easing: [.4, 0, 0, 1],
    duration: 500,
  });
  anime({
    targets: elem2,
    color: '#999999',
    easing: [.4, 0, 0, 1],
    duration: 500,
  })
}
