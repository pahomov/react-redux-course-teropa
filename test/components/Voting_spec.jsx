import React from 'react/addons'
import {List} from 'immutable'
import Voting from '../../src/components/Voting'
import {expect} from 'chai'

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils

describe('Voting', () => {

  it('рендерит две кнопки', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]} />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].textContent).to.equal('Trainspotting')
    expect(buttons[1].textContent).to.equal('28 Days Later')
  })

  it('вызывает коллбэк при нажатии кнопки', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry

    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote} />
    )

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
    Simulate.click(buttons[0])

    expect(votedWith).to.equal('Trainspotting')
  })

  it('дизаблит кнопки когда юзер проголосовал', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              hasVoted="Trainspotting" />
    )

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].hasAttribute('disabled')).to.equal(true)
    expect(buttons[1].hasAttribute('disabled')).to.equal(true)
  })

  it('добавляет надпись к выбранной штуке', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              hasVoted="Trainspotting" />
    )

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons[0].textContent).to.contain('Voted')
  })

  it('отображает победителя', () => {
    const component = renderIntoDocument(
      <Voting winner="Trainspotting" />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
    expect(buttons.length).to.equal(0)

    const winner = React.findDOMNode(component.refs.winner)
    expect(winner).to.be.ok
    expect(winner.textContent).to.contain('Trainspotting')
  })

  it('отображается как чистый компонент', () => {
    const pair = ['Trainspotting', '28 Days Later']
    const component = renderIntoDocument(
      <Voting pair={pair} />
    )

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('Trainspotting')

    pair[0] = 'Sunshine'
    component.setProps({pair: pair})
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('Trainspotting')
  })

  it('обновляет DOM когда пропертя меняется', () => {
    const pair = List.of('Trainspotting', '28 Days Later')
    const component = renderIntoDocument(
      <Voting pair={pair} />
    )

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('Trainspotting')

    const newPair = pair.set(0, 'Sunshine')
    component.setProps({pair: newPair})
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('Sunshine')
  })

})
