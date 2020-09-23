import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { selectCountPlaces } from '../../store/selectors'
import styles from './Project.module.scss'
import { RootState } from '../../store/reducers'

const Project: FC<Props> = ({ company, places, description, logo }) => {
  const placesCase = (count: number): string => {
    if (
      count % 10 === 0 ||
      count % 10 === 5 ||
      count % 10 === 6 ||
      count % 10 === 7 ||
      count % 10 === 8 ||
      count % 10 === 9 ||
      count === 11 ||
      count === 12 ||
      count === 13 ||
      count === 14
    )
      return 'мест'
    else if (count % 10 === 1 && count !== 11) return 'место'
    else return 'места'
  }

  return (
    <>
      <li className={styles.project}>
        <div className={styles.logoAndPlaces}>
          {logo ? (
            <button className={styles.logo}>
              <img src={logo} alt={company} />
            </button>
          ) : (
            <div className={styles.companyName}>@{company}</div>
          )}
          <span className={styles.places}>
            {places} {placesCase(places)}
          </span>
        </div>
        <p className={styles.description}>{description}</p>
        <NavLink
          to={{
            pathname: '/project',
            state: {
              description,
            },
          }}
          className={styles.detailed}
        >
          Подробнее
        </NavLink>
      </li>
    </>
  )
}

interface OwnProps {
  id: string
  company: string
  logo: string
  description: string
}

interface StateProps {
  places: number
}

type Props = OwnProps & StateProps

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  places: selectCountPlaces(state, ownProps),
})

export default connect(mapStateToProps)(Project)
