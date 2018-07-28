import * as React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) =>
    <div className="progress">
        <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{
                "width": (
                    ((current + 1) / (total + 1)) * 100
                ) + "%"
            }}
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={total}
        >
            {current} / {total}
        </div>
    </div>;

export default ProgressBar;