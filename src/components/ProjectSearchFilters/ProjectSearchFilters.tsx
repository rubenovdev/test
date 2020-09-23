import React from 'react'

import Tabs from '../Tabs/Tabs'
import ProjectSearchFilterItems from '../ProjectSearchFilterItems/ProjectSearchFilterItems'

const ProjectSearchFilters = () => {
  const directions = [
    'Транспорт',
    'Энергетика',
    'Химбиотех',
    'Дизайн и мультимедиа',
    'Транспорт',
    'Энергетика',
    'Химбиотех',
    'Технология',
  ]

  const partners = [
    'Тинькофф',
    'Яндекс',
    'Mail.ru',
    'МТС',
    'Мегафон',
    'Авито',
    'Сбербанк',
  ]

  const status = ['статус 1', 'статус 2']

  return (
    <Tabs tabsStyle={'projectSearchFilters'}>
      <ProjectSearchFilterItems data-tabname="Направления" items={directions} />
      <ProjectSearchFilterItems data-tabname="Партнеры" items={partners} />
      <ProjectSearchFilterItems data-tabname="Статус" items={status} />
    </Tabs>
  )
}

export default ProjectSearchFilters
