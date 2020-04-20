import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'

const ErrorScreen = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ErrorMessage = styled.div`
    background: url('/images/error-icon.svg') top center no-repeat #fff;
    width: 300px;;
    height: 100px;
    & > p {
        text-align: center;
        & a {
            text-decoration: none;
            color: #C75C5C;
        }
    }

    & > p.description {
        margin-top: 85px;
        font-size: 16px;
        text-align: center;
        width: 100%;
    }
`;

export interface ErrorPageOwnProps {
    description: string;
    backUrl?: string;
}

export const ErrorPage: React.FC<ErrorPageOwnProps> = ({ description, backUrl }) => {
    return (
        <ErrorScreen>
            <ErrorMessage>
                <p className="description">{description}</p>
                { backUrl && 
                    <p><Link to={backUrl}>Go back</Link></p>
                }
            </ErrorMessage>
        </ErrorScreen>
    );
};

export default ErrorPage;