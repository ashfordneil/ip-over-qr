import * as React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) =>
    <div className="progress" style={{ width: "100%" }}>
        <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{
                "width": (
                    (current / total) * 100
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
