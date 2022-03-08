import React from 'react';
import { Col, Form, Radio, Row, Skeleton, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const browser = typeof window !== 'undefined' ? true : false;

if (browser) require('./styles.css');

export default ({
	disabled = false,
	error = null,
	extra = null,
	hasTooltip = false,
	id,
	inlineError = true,
	label = '',
	labelTrue = null,
	labelFalse = null,
	onChange,
	required = false,
	tooltip = null,
	value = null,
	withLabel = false
}) => {
	const renderRadio = () => {
		return (
			<Radio.Group disabled={disabled} name={id} onChange={e => onChange(e, id, e.target.value)} value={value}>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Radio value={true}>{labelTrue ? labelTrue : 'YES'}</Radio>
					</Col>
					<Col span={24}>
						<Radio value={false}>{labelFalse ? labelFalse : 'NO'}</Radio>
					</Col>
				</Row>
			</Radio.Group>
		);
	};

	let formItemCommonProps = {
		colon: false,
		label: withLabel ? (
			<>
				<div style={{ float: 'right' }}>{extra}</div>{' '}
				<span class="label">
					{label}{' '}
					{hasTooltip ? (
						<Tooltip title={tooltip}>
							<QuestionCircleOutlined />
						</Tooltip>
					) : (
						''
					)}
				</span>
			</>
		) : (
			false
		),
		required,
		validateStatus: error ? 'error' : 'success'
	};
	if (inlineError) formItemCommonProps = { ...formItemCommonProps, help: error ? error : '' };

	return (
		<Form.Item {...formItemCommonProps}>
			{browser ? renderRadio() : <Skeleton active paragraph={{ rows: 1, width: '100%' }} title={false} />}
		</Form.Item>
	);
};
