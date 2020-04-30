/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { get, isEmpty } from 'lodash'
import { Alert } from '@pitrix/lego-ui'
import { Text } from 'components/Base'

import Item from './Item'

import styles from './index.scss'

export default class RuleList extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    onAdd() {},
    onDelete() {},
  }

  handleAdd = () => {
    this.props.onAdd()
  }

  renderContent() {
    const { data, onAdd, onDelete, gateway } = this.props
    const rules = get(data, 'spec.rules', [])
    const tls = get(data, 'spec.tls[0]', {})

    return (
      <ul>
        {rules.map(rule => (
          <Item
            key={rule.host}
            rule={rule}
            tls={tls}
            onEdit={onAdd}
            onDelete={onDelete}
          />
        ))}
        {!isEmpty(gateway) && (
          <div className={styles.add} onClick={this.handleAdd}>
            <Text
              title={t('Add Route Rule')}
              description={t('为应用添加外网访问规则')}
            />
          </div>
        )}
      </ul>
    )
  }

  render() {
    const { gateway, error } = this.props
    return (
      <div className={styles.wrapper}>
        {isEmpty(gateway) && (
          <Alert
            className="margin-b12"
            description={t.html('NO_INTERNET_ACCESS_TIP')}
            type="warning"
          />
        )}
        {this.renderContent()}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
}