import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = (props) => {
    return (
        <div data-test="component-guessedWords">
            { props.guessedWords.length === 0 ?
                <span data-test="instruction-message"></span> :
                <div>
                    <h3>Guessed Words</h3>
                    <table data-test="words-table">
                        <thead>
                            <tr>
                                <th>Words</th>
                                <th>Matching Letters</th>
                            </tr>
                        </thead>
                        <tbody>
                            { props.guessedWords.map((word, index) => (
                                <tr data-test="words-table-row" key="index">
                                    <td>{word.guessedWords}</td>
                                    <td>{word.letterMatchCount}</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired,
};

export default GuessedWords;