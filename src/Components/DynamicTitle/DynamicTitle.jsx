import React, { useEffect } from 'react';

const DynamicTitle = ({title}) => {
    useEffect(() => {
        document.title = `Sufra By SLASH - ${title}`
        return () => {
            document.title = 'Sufra by SLASH'
        }
    }, [title])
};

export default DynamicTitle;