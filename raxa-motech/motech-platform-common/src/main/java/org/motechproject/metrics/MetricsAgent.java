package org.motechproject.metrics;

import java.util.Map;

/**
 *  Interface into the metrics system
 */
public interface MetricsAgent
{
    /**
     * Reports an occurrence of metric, incrementing it's count.  Not all implementations
     * may make use of parameters
     *
     * @param metric The metric being recorded
     * @param parameters Optional parameters related to the event
     */
    public void logEvent(String metric, Map<String, String> parameters);

    /**
     * Reports an occurrence of metric, incrementing it's count.
     *
     * @param metric The metric being recorded
     */
    public void logEvent(String metric);

    /**
     * Starts a timer for metric.  Later calls to startTimer without a corresponding call to endTimer for the same
     * metric are ignored
     *
     * @param metric The metric being timed
     */
    public void startTimer(String metric);

    /**
     * Ends the timer for metric and records it.  No action is taken if a start timer was not recorded for metric
     *
     * @param metric The metric being timed
     */
    public void stopTimer(String metric);
}
