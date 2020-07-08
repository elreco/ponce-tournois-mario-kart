import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import _ from 'lodash';
import { useSocket } from '../../../utils/useSocket';
import Participation from '../../participations/Participation';
import ParticipationSkeleton from './ParticipationSkeleton';

function PonceParticipation({ tournament }) {
    const { socket } = useSocket();
    const [participation, setParticipation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('getPonceParticipation', (participation) => {
            setParticipation(participation);
            setLoading(false);
        });

        socket.emit('getPonceParticipation', tournament.id, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => socket.off('getPonceParticipation');
    }, []);

    return loading ? (
        <ParticipationSkeleton />
    ) : error ? (
        <Row justify="center">
            <Col xs="content">
                <div className="formMessage formMessage__error">{error}</div>
            </Col>
        </Row>
    ) : (
        <Participation
            participation={participation}
            refreshParticipation={setParticipation}
            nbMaxRaces={tournament.nbMaxRaces}
        />
    );
}

export default PonceParticipation;
